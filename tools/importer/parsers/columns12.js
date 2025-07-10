/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (these are the columns)
  const columnDivs = element.querySelectorAll(':scope > div');
  // Header row: single cell, as per markdown example
  const headerRow = ['Columns (columns12)'];
  // Content row: one cell per column (image per cell)
  const columnsRow = Array.from(columnDivs).map(col => {
    // Use the img inside each column div, if present
    const img = col.querySelector('img');
    return img || col;
  });

  // Build the table: first row is single cell header, second row is N columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
