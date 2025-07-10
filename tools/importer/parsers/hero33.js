/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the section
  const container = element.querySelector('.container');
  let grid = null;
  if (container) {
    grid = container.querySelector('.grid-layout');
  } else {
    // fallback: try to find grid directly in element
    grid = element.querySelector('.grid-layout');
  }
  if (!grid) grid = element;

  // Find the image: first <img> that is a direct child of grid
  let image = null;
  let textBlock = null;
  const gridChildren = grid.querySelectorAll(':scope > *');
  for (let i = 0; i < gridChildren.length; i++) {
    const child = gridChildren[i];
    if (!image && child.tagName === 'IMG') {
      image = child;
    } else if (!textBlock && child.tagName === 'DIV') {
      textBlock = child;
    }
    if (image && textBlock) break;
  }

  // If not found, fallback to first img/div anywhere in grid
  if (!image) image = grid.querySelector('img');
  if (!textBlock) textBlock = grid.querySelector('div');

  // Build the rows for the block table
  const rows = [];
  rows.push(['Hero (hero33)']); // Header row (exact match)
  rows.push([image || '']); // Row 2: image or empty if missing
  rows.push([textBlock || '']); // Row 3: content block or empty if missing

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
