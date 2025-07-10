/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Setup header row
  const headerRow = ['Cards (cards38)'];
  const cells = [headerRow];

  // 2. Find the main grid layout containing cards
  const container = element.querySelector('.container');
  if (!container) return;
  // The top-level grid contains both direct cards and nested grids
  const topLevelGrids = Array.from(container.children).filter(child => child.classList.contains('w-layout-grid'));
  if (topLevelGrids.length === 0) return;
  const mainGrid = topLevelGrids[0];
  const cardNodes = Array.from(mainGrid.children);

  cardNodes.forEach((node) => {
    // If it's a card anchor
    if (node.matches('a')) {
      // Image: find img within .utility-aspect-2x3 or .utility-aspect-1x1 if present, otherwise any img inside anchor
      let img = null;
      const aspectDiv = node.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
      if (aspectDiv) {
        img = aspectDiv.querySelector('img');
      }
      if (!img) {
        img = node.querySelector('img');
      }
      // Text: if utility-padding-all-2rem exists, use that as the text wrapper; else, use anchor itself
      const textWrapper = node.querySelector('.utility-padding-all-2rem') || node;
      const heading = textWrapper.querySelector('h3');
      const desc = textWrapper.querySelector('p');
      const cta = textWrapper.querySelector('.button');
      const textElements = [];
      if (heading) textElements.push(heading);
      if (desc) textElements.push(desc);
      if (cta) textElements.push(cta);
      // Only push if at least image and some text present
      if (img && textElements.length > 0) {
        cells.push([img, textElements]);
      }
    } else if (node.matches('.w-layout-grid')) {
      // Nested grid: find all card anchors within
      const nestedCards = Array.from(node.querySelectorAll('a.utility-link-content-block'));
      nestedCards.forEach((nested) => {
        let img = null;
        const aspectDiv = nested.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
        if (aspectDiv) {
          img = aspectDiv.querySelector('img');
        }
        if (!img) {
          img = nested.querySelector('img');
        }
        const heading = nested.querySelector('h3');
        const desc = nested.querySelector('p');
        const cta = nested.querySelector('.button');
        const textElements = [];
        if (heading) textElements.push(heading);
        if (desc) textElements.push(desc);
        if (cta) textElements.push(cta);
        if (img && textElements.length > 0) {
          cells.push([img, textElements]);
        }
      });
    }
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
