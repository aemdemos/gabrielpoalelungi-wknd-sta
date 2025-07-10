/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the two column divs (direct children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const numCols = columns.length || 1;

  // Build base table structure
  const cells = [];

  // Header: single cell, matching example
  cells.push(['Columns (columns30)']);

  // Second row: one cell per column
  if (columns.length > 0) {
    cells.push(columns);
  } else {
    cells.push(['']);
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Fix header colspan so it spans all columns
  const headerRow = table.querySelector('tr:first-child');
  if (headerRow && headerRow.children.length === 1 && numCols > 1) {
    headerRow.children[0].setAttribute('colspan', numCols);
  }
  // Replace original element with new table
  element.replaceWith(table);
}
