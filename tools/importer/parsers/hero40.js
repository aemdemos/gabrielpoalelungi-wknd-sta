/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Hero (hero40)'];

  // --- Row 2: Background Image ---
  // Find the main image (background)
  let bgImgCell = '';
  const img = element.querySelector('img');
  if (img) {
    bgImgCell = img;
  }

  // --- Row 3: Content ---
  // Find the content area: goal is to include heading, description, button
  let contentCell = '';
  // Find the .container (right side)
  const container = element.querySelector('.container');
  if (container) {
    contentCell = container;
  }

  // Compose the table rows as per the block definition
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
