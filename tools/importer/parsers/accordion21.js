/* global WebImporter */
export default function parse(element, { document }) {
  // Block table header (should match exactly the required format)
  const headerRow = ['Accordion (accordion21)'];

  // Find all direct child '.divider' elements for each accordion item
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  const rows = [headerRow];

  // For each divider, extract the title and content
  dividers.forEach(divider => {
    // Each .divider > .grid-layout, which contains title and content
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return; // skip if structure is not as expected
    const children = Array.from(grid.children);
    // Find the title (heading) and content (rich-text)
    const title = children.find(child => child.classList.contains('h4-heading'));
    const content = children.find(child => child.classList.contains('rich-text'));
    // Only add row if both title and content are present
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
