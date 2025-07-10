/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing both the content and the image
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));

  // Get image (background image for block)
  const img = gridChildren.find(child => child.tagName === 'IMG');

  // Get content block (contains heading, subheading, cta, etc.)
  const contentBlock = gridChildren.find(child => child !== img);

  // Defensive: if either piece missing, still build the table

  // Compose the table rows as per block spec
  const rows = [];
  rows.push(['Hero (hero29)']); // Header row exactly as per example
  rows.push([img || '']);       // Second row: image or empty string if missing
  rows.push([contentBlock || '']); // Third row: the content block or empty

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
