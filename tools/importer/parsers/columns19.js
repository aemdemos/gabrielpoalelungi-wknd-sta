/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify left column (text), contact methods (ul), and image (img)
  let leftCol = null;
  let contactList = null;
  let img = null;

  for (const child of gridChildren) {
    if (!leftCol && child.querySelector && child.querySelector('h2') && child.querySelector('h3') && child.querySelector('p')) {
      leftCol = child;
    } else if (!contactList && child.tagName === 'UL') {
      contactList = child;
    } else if (!img && child.tagName === 'IMG') {
      img = child;
    }
  }

  // Fallbacks for empty slots
  if (!leftCol) leftCol = document.createElement('div');
  if (!contactList) contactList = document.createElement('div');
  if (!img) img = document.createElement('div');

  // Build the three column table as per the layout example
  const headerRow = ['Columns (columns19)'];
  const contentRow = [leftCol, contactList, img];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
