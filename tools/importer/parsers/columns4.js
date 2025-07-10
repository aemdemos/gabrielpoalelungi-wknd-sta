/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct .container > .grid-layout
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // The grid has 3 main children corresponding to visual columns
  // 1st: The large left feature (firstCol)
  // 2nd: The stack of two right cards (rightTop, rightMid)
  // 3rd: The vertical stack of links (rightStackDiv)

  // Defensive: check children length
  if (grid.children.length < 3) return;

  // First column: the left feature block (a)
  const firstCol = grid.children[0];

  // Second (top right) and third (mid right) columns are the two <a> inside the second child
  let rightTop = null, rightMid = null;
  const secondColGroup = grid.children[1];
  if (secondColGroup) {
    const links = Array.from(secondColGroup.querySelectorAll(':scope > a'));
    rightTop = links[0] || null;
    rightMid = links[1] || null;
  }

  // Fourth column: vertical stack of links in third grid child
  const rightStackDiv = grid.children[2];
  // We reference the entire container for this column - this allows all links+dividers to be handled as in the design

  // Build cells for columns4
  const cells = [
    ['Columns (columns4)'],
    [firstCol, rightTop, rightMid, rightStackDiv]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
