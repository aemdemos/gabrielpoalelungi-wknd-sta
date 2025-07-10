/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane or fallback to the first tab pane
  const panes = element.querySelectorAll(':scope > .w-tab-pane');
  let activePane = null;
  for (const pane of panes) {
    if (pane.classList.contains('w--tab-active')) {
      activePane = pane;
      break;
    }
  }
  if (!activePane && panes.length > 0) {
    activePane = panes[0];
  }
  if (!activePane) return;

  // Find the immediate grid child (contains the block content)
  const grid = activePane.querySelector(':scope > .w-layout-grid');
  if (!grid) return;

  // Collect all direct children of the grid (text, headings, images, etc.)
  // We want to preserve all meaningful content and structure for flexibility
  const gridChildren = Array.from(grid.childNodes).filter(node => {
    // Keep element nodes and non-empty text nodes (avoid pure whitespace)
    return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim() !== '');
  });

  // Split out image(s) (if any) for the second row, everything else for third row
  const images = gridChildren.filter(node => node.nodeType === 1 && node.tagName.toLowerCase() === 'img');
  const nonImages = gridChildren.filter(node => !(node.nodeType === 1 && node.tagName.toLowerCase() === 'img'));

  // If there are images, use them for the bg row, else leave empty
  let imageCell = '';
  if (images.length === 1) imageCell = images[0];
  else if (images.length > 1) imageCell = images;

  // If there is non-image content (headings/text), preserve all in the next row
  let contentCell = '';
  if (nonImages.length === 1) contentCell = nonImages[0];
  else if (nonImages.length > 1) contentCell = nonImages;

  // If everything is empty, just make empty cells
  const cells = [
    ['Hero (hero23)'],
    [imageCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
