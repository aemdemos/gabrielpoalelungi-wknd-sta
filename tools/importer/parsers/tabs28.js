/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one cell, just the block name
  const headerRow = ['Tabs'];

  // Extract all direct child <a> elements as tab labels
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Each tab row should have two cells: [label, empty content]
  const tabRows = tabLinks.map(link => {
    let label = '';
    const div = link.querySelector('div');
    if (div && div.textContent.trim()) {
      label = div.textContent.trim();
    } else {
      label = link.textContent.trim();
    }
    return [label, ''];
  });

  // The table should have 1 column in the header, but 2 columns in subsequent rows.
  // This matches the markdown example (header = block name, then tab label + tab content)
  // WebImporter.DOMUtils.createTable supports this structure.

  // Concatenate rows
  const tableData = [headerRow, ...tabRows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
