/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Find the main grid layout with multiple columns (should have class grid-layout)
  const grids = Array.from(container.querySelectorAll(':scope > .w-layout-grid'));
  const mainGrid = grids.length ? grids[0] : null;
  if (!mainGrid) return;

  // The mainGrid should have two columns: left (heading + quote), right (testimonial info + logo)
  // Let's extract the children in order
  const children = Array.from(mainGrid.children);

  // Heuristics for this Webflow-style grid:
  // - left column: heading (h2-heading), quote (paragraph-lg)
  // - right column: nested grid (testimonial info and logo)
  let leftColumn = [];
  let rightColumn = [];

  // Find left column content (heading + quote)
  const heading = children.find(el => el.classList.contains('h2-heading'));
  const quote = children.find(el => el.classList.contains('paragraph-lg'));
  if (heading) leftColumn.push(heading);
  if (quote) leftColumn.push(quote);

  // Find the nested grid for right column
  const subGrid = children.find(el => el.classList.contains('w-layout-grid') && el !== mainGrid);
  if (subGrid) {
    // For the right column, the example's intent is to show the testimonial info as its own column
    // We'll grab the testimonial avatar/name/title and the logo (utility-display-inline-block)
    // Assemble them in the right column, in the original order
    const subChildren = Array.from(subGrid.children);
    // Remove the divider (if any)
    const testimonialInfo = subChildren.find(el => el.classList.contains('flex-horizontal'));
    const logo = subChildren.find(el => el.classList.contains('utility-display-inline-block'));
    if (testimonialInfo) rightColumn.push(testimonialInfo);
    if (logo) rightColumn.push(logo);
  }

  // Defensive: if either column is empty, insert an empty string for robustness
  if (!leftColumn.length) leftColumn.push('');
  if (!rightColumn.length) rightColumn.push('');

  // Structure matches the markdown example: header row, then 1 row with 2 columns
  const cells = [
    ['Columns (columns27)'],
    [leftColumn, rightColumn],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
