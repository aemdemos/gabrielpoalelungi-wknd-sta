/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container inside the block
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children: image and content (heading, subheading, buttons)
  const children = Array.from(grid.children);
  let imageEl = null;
  let contentEl = null;

  for (const child of children) {
    if (child.tagName === 'IMG') {
      imageEl = child;
    } else {
      contentEl = child;
    }
  }

  // If image or content missing, still put the row to preserve structure
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentEl ? contentEl : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
