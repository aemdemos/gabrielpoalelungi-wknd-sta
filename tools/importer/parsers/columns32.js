/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('[class*="grid-layout"], [class*="columns"]');
  if (!grid) return;

  // Get all direct children (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row: single cell, exactly matching the example
  const headerRow = ['Columns (columns32)'];
  // Content row: one cell per column
  const contentRow = columns;

  // Build the cells array: header row (single cell), then content row (one per column)
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
