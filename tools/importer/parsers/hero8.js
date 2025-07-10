/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero8)'];

  // Find the grid that contains the image and content
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find the first img within the grid for the hero image
  const img = grid.querySelector('img');
  const imageRow = [img ? img : ''];

  // Find the content column (the column with the main heading)
  let contentCol = null;
  const gridChildren = Array.from(grid.children);
  for (const child of gridChildren) {
    if (child.querySelector('h1')) {
      contentCol = child;
      break;
    }
  }

  // Gather all content from the contentCol
  // Reference all nodes directly (not clone)
  let contentNodes = [];
  if (contentCol) {
    // Gather all child nodes (include text nodes, elements)
    contentNodes = Array.from(contentCol.childNodes).filter(node => {
      // Keep all element nodes and text nodes with visible content
      return node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    });
    // If only one node, put it directly, else array
  }
  const contentRow = [contentNodes.length === 1 ? contentNodes[0] : (contentNodes.length > 1 ? contentNodes : '')];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
