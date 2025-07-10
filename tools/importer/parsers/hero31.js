/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Look for the heading (title)
  const heading = grid.querySelector('h2');
  // Look for a rich text block (will contain paragraphs)
  const richText = grid.querySelector('.rich-text');

  // Compose content cell for third row
  const contentArr = [];
  if (heading) contentArr.push(heading);
  if (richText) contentArr.push(richText);

  // Table structure per spec: header, image row (empty), content row
  const table = WebImporter.DOMUtils.createTable([
    ['Hero (hero31)'],
    [''],
    [contentArr]
  ], document);

  element.replaceWith(table);
}
