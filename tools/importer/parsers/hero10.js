/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per instructions
  const headerRow = ['Hero (hero10)'];

  // Extract all background images from the grid
  let bgCellContent = '';
  const gridLayout = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (gridLayout) {
    // Collect all <img> elements
    const imgs = Array.from(gridLayout.querySelectorAll('img'));
    if (imgs.length > 0) {
      const bgDiv = document.createElement('div');
      imgs.forEach(img => bgDiv.appendChild(img)); // reference only
      bgCellContent = bgDiv;
    }
  }

  // Extract the content: headline, subheading, CTAs
  let contentCellContent = '';
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    contentCellContent = contentContainer;
  }

  const cells = [
    headerRow,
    [bgCellContent],
    [contentCellContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
