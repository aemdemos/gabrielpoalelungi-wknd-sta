/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: Use the exact block name from the example
  const headerRow = ['Hero (hero25)'];

  // 1. Find image (should be prominent and top-level)
  let imageEl = null;
  // 2. Find content block (should contain heading, description, call to action)
  let contentEl = null;

  // The structure: section > .w-layout-grid (outer) > [contentGrid, image]
  const outerGrid = element.querySelector(':scope > .w-layout-grid');
  if (!outerGrid) return;
  // Find the content and image within the grid
  const directChildren = Array.from(outerGrid.children);
  directChildren.forEach(child => {
    if (child.tagName === 'IMG') {
      imageEl = child;
    } else if (
      child.querySelector('h1, h2, h3, .h2-heading') ||
      child.querySelector('.rich-text') ||
      child.querySelector('.button-group')
    ) {
      contentEl = child;
    }
  });
  // Fallbacks
  if (!imageEl) imageEl = element.querySelector('img');
  if (!contentEl) contentEl = element.querySelector('h1, h2, h3, .h2-heading')?.closest('div');

  // 2nd row: Background image (optional)
  // If imageEl is found, include it directly (do not clone)
  const secondRow = imageEl ? [imageEl] : [''];

  // 3rd row: Title/heading, subheading, call to action
  const contentParts = [];
  if (contentEl) {
    // Title/Heading
    const heading = contentEl.querySelector('h1, h2, .h2-heading');
    if (heading) contentParts.push(heading);
    // Subheading (paragraph)
    // Look for .rich-text or p tags inside contentEl
    const subheading = contentEl.querySelector('.rich-text, .paragraph-lg, p');
    if (subheading) contentParts.push(subheading);
    // Call to action (button group)
    const buttonGroup = contentEl.querySelector('.button-group');
    if (buttonGroup) contentParts.push(buttonGroup);
  }
  // If no content parts, add empty string to preserve rows
  const thirdRow = contentParts.length > 0 ? [contentParts] : [''];

  // Compose table structure
  const cells = [headerRow, secondRow, thirdRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
