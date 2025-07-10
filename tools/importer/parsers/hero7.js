/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Table header
  const headerRow = ['Hero (hero7)'];

  // Step 2: There is no background image in this HTML, so row 2 is blank
  const backgroundRow = [''];

  // Step 3: Collect content for the third row
  // - Title (heading)
  // - Subheading (not present in this case)
  // - Paragraph
  // - CTA (button link)

  // Find the grid container
  const grid = element.querySelector('.grid-layout');

  let title = null;
  let contentDiv = null;
  let contentNodes = [];
  if (grid) {
    // Title is the first heading in the grid
    title = Array.from(grid.children).find(
      el => /^H[1-6]$/i.test(el.tagName)
    );
    // Content div (contains paragraph and CTA)
    contentDiv = Array.from(grid.children).find(
      el => el !== title && el.tagName === 'DIV'
    );
    if (contentDiv) {
      contentNodes = Array.from(contentDiv.childNodes).filter(
        node => node.nodeType === Node.ELEMENT_NODE
      );
    }
  }

  // Compose the content cell, preserving order and referencing real elements
  const blockContent = [];
  if (title) blockContent.push(title);
  blockContent.push(...contentNodes);

  const contentRow = [blockContent];

  // Assemble the table
  const rows = [headerRow, backgroundRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
