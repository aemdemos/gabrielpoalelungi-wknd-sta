/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid container (the first .w-layout-grid)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = grid.children;

  // Identify background image (from absolute positioned image in first grid cell)
  let backgroundImg = null;
  let cardContent = null;

  // The grid structure is:
  // [0] - a div with background image inside
  // [1] - a div with the actual card content
  if (gridChildren[0]) {
    // Try to find the background image (cover-image, utility-position-absolute)
    const img = gridChildren[0].querySelector('img.cover-image');
    if (img) backgroundImg = img;
  }
  if (gridChildren[1]) {
    // Try to find the card (with .card)
    const card = gridChildren[1].querySelector('.card');
    if (card) cardContent = card;
  }

  // Prepare rows according to block spec: header, background, content
  const headerRow = ['Hero (hero13)'];
  const backgroundRow = [backgroundImg ? backgroundImg : ''];
  const contentRow = [cardContent ? cardContent : ''];

  const cells = [headerRow, backgroundRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
