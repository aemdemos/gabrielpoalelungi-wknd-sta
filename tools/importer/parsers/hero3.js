/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches exactly the spec
  const headerRow = ['Hero (hero3)'];

  // Background image row: not present in provided HTML, so empty string
  const bgImageRow = [''];

  // Content row: gather all content (heading, subheading, CTAs) in order, referencing existing elements
  let contentParts = [];
  // Find the main grid which contains all content
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // All direct children: left is text, right is buttons (CTAs)
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren[0]) {
      // Append all children in order (should be h2, p)
      Array.from(gridChildren[0].children).forEach(child => {
        contentParts.push(child);
      });
    }
    if (gridChildren[1]) {
      // Append all children (should be a elements for buttons)
      Array.from(gridChildren[1].children).forEach(child => {
        contentParts.push(child);
      });
    }
  }
  // If no content, add empty string to avoid empty cell
  if (contentParts.length === 0) contentParts = [''];

  // Compose table per requirements
  const cells = [
    headerRow,
    bgImageRow,
    [contentParts]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
