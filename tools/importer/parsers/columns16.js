/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per spec
  const headerRow = ['Columns (columns16)'];

  // Get first main columns grid (contains text/author/button)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column.grid-gap-lg');
  let leftContent = [];
  let rightContent = [];
  if (mainGrid) {
    // left column: eyebrow + h1
    const leftCol = mainGrid.children[0];
    if (leftCol) {
      leftContent = Array.from(leftCol.childNodes).filter(n => n.nodeType !== 3 || n.textContent.trim());
    }
    // right column: paragraph, author meta, and button
    const rightCol = mainGrid.children[1];
    if (rightCol) {
      // Paragraph
      const paragraphDiv = rightCol.querySelector('.rich-text.paragraph-lg');
      if (paragraphDiv) rightContent.push(paragraphDiv);
      // Author info + button
      const infoGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
      if (infoGrid) rightContent.push(infoGrid);
    }
  }

  // Get the images grid (second grid)
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imagesRow = [];
  if (imageGrid) {
    imagesRow = Array.from(imageGrid.children);
  }

  // Assemble table
  const cells = [
    headerRow,
    [leftContent, rightContent],
    imagesRow.length ? imagesRow : undefined
  ].filter(Boolean); // Remove undefined if no images

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
