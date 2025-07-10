/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required: single column
  const headerRow = ['Columns (columns39)'];

  // Get all direct child divs of the grid (each is a column)
  const colDivs = Array.from(element.querySelectorAll(':scope > div'));

  // The second row: as many columns as there are children
  const contentRow = colDivs;

  // Build the table with a single-cell header and correct number of columns in only the second row
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
