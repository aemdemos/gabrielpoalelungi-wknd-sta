/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per requirements
  const headerRow = ['Carousel (carousel37)'];

  // Get columns from the grid
  const grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-xxl');
  let leftCol = null;
  let rightCol = null;
  if (grid) {
    const cols = Array.from(grid.children);
    if (cols.length >= 2) {
      leftCol = cols[0];
      rightCol = cols[1];
    }
  }

  // Extract text content for the right cell (headings, description, CTAs)
  const textFragments = [];
  if (leftCol) {
    const heading = leftCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textFragments.push(heading);
    const subheading = leftCol.querySelector('p');
    if (subheading) textFragments.push(subheading);
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) textFragments.push(buttonGroup);
  }

  // Get all images (each is a slide)
  let images = [];
  if (rightCol) {
    // Some carousel blocks put images in a nested grid
    const imagesGrid = rightCol.querySelector('.w-layout-grid');
    if (imagesGrid) {
      images = Array.from(imagesGrid.querySelectorAll('img'));
    } else {
      images = Array.from(rightCol.querySelectorAll('img'));
    }
  }

  // Build table rows: first row after header gets the text, others get blank cell
  const table = [headerRow];
  images.forEach((img, i) => {
    if (i === 0 && textFragments.length > 0) {
      table.push([img, textFragments]);
    } else {
      table.push([img, '']);
    }
  });

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
