/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Setup the block header row.
  const headerRow = ['Hero (hero36)'];

  // 2. Second row is for background image (none in this source, so empty string)
  const bgRow = [''];

  // 3. Third row: Title (heading), Subheading (paragraph), CTA (link)
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  let contentEls = [];
  if (grid) {
    // The grid children are usually two: one for text/subheading, one for CTA
    // Get all direct children only
    const gridChildren = Array.from(grid.children);
    // Text column: has heading
    const textCol = gridChildren.find(
      (div) => div.querySelector('h1, h2, h3, h4, h5, h6')
    );
    // CTA column: has a link
    const ctaCol = gridChildren.find((div) => div.tagName === 'A' || div.querySelector('a'));

    if (textCol) {
      // Add all headings and subheadings (h*, p)
      Array.from(textCol.children).forEach((child) => {
        if (/^H[1-6]$/.test(child.tagName) || child.tagName === 'P') {
          contentEls.push(child);
        }
      });
    }
    if (ctaCol) {
      // If button is an <a> inside a div, select the <a>
      if (ctaCol.tagName === 'A') {
        contentEls.push(ctaCol);
      } else {
        const link = ctaCol.querySelector('a');
        if (link) contentEls.push(link);
      }
    }
  }
  // Fallback: if we couldn't find content, don't break the table
  if (contentEls.length === 0) contentEls = [''];

  const contentRow = [contentEls];

  // 4. Compose the table and replace the element
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
