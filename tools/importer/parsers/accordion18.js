/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row exactly matches the example
  const headerRow = ['Accordion (accordion18)'];
  const rows = [];

  // Get all direct children accordion items (divs with .accordion)
  const items = element.querySelectorAll(':scope > .accordion');

  items.forEach((item) => {
    // Title: find .w-dropdown-toggle then the .paragraph-lg inside
    let titleEl = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
    }
    // Content: find nav.accordion-content, include the whole nav as content
    let contentEl = null;
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      contentEl = nav;
    }
    // Only add the row if both title and content exist
    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  // Create the table with header and all rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  // Replace the element with the new table
  element.replaceWith(table);
}
