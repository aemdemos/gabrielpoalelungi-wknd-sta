/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, must match exactly
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];
  // Find all tab panes (each .w-tab-pane)
  const tabPanes = element.querySelectorAll('[class*=w-tab-pane]');
  tabPanes.forEach((pane) => {
    // Inside pane, find .w-layout-grid (cards grid)
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> with .utility-link-content-block
    const cards = grid.querySelectorAll('.utility-link-content-block');
    cards.forEach((card) => {
      // Image cell: find .utility-aspect-3x2 > img
      let imageCell = '';
      const aspect = card.querySelector('.utility-aspect-3x2');
      if (aspect) {
        const img = aspect.querySelector('img');
        if (img) imageCell = img;
      }
      // Text cell: heading + paragraph, always reference existing elements
      let heading = card.querySelector('h3, .h4-heading');
      let desc = card.querySelector('.paragraph-sm');

      // For some cards, heading/desc are nested deeper
      if ((!heading || !desc) && card.querySelector('.utility-text-align-center')) {
        const nested = card.querySelector('.utility-text-align-center');
        if (nested) {
          if (!heading) heading = nested.querySelector('h3, .h4-heading');
          if (!desc) desc = nested.querySelector('.paragraph-sm');
        }
      }
      // If paragraph also has utility-margin-bottom-0, still pick it
      if (!desc) {
        desc = card.querySelector('div[class*="paragraph-sm"]');
      }
      // Build cell: always keep structure [heading, desc] if present
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      rows.push([imageCell, textCell]);
    });
  });
  // Replace only if there are cards (i.e., > 1 row)
  if (rows.length > 1) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
