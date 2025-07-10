/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // The grid has 4 children: logo/socials, Trends, Inspire, Explore
  // Each child should be a column in the columns block
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Compose the table header as a single cell that spans all columns.
  // To do this, make the header row an array with a single cell.
  const headerRow = ['Columns (columns11)'];

  // Content row: each column as its own cell
  const contentRow = columns;

  // Compose the table: header is a single cell, content row has one cell per column
  const cells = [
    headerRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
