/* global WebImporter */
export default function parse(element, { document }) {
  // The table header must be a single-cell row, exactly as in the example
  const headerRow = ['Carousel (carousel17)'];

  // The table must have two columns (image, text) as in example, even if text cell is empty
  // Find the grid containing the slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each slide is a direct child div of the grid
  const slideDivs = Array.from(grid.children);

  // For each slide, extract the image for the first cell; the second cell is blank (no text in input)
  const rows = slideDivs.map((slide) => {
    let img = slide.querySelector('img');
    // If no image is found, use an empty string to keep table structure
    return [img || '', ''];
  });

  // Compose cells: single header row, then each slide row (two columns)
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
