/* global WebImporter */
export default function parse(element, { document }) {
  // --- HEADER ---
  const headerRow = ['Hero (hero6)'];

  // --- BACKGROUND IMAGE ROW ---
  // Find the background image: img.cover-image
  let bgImg = null;
  const imgs = element.querySelectorAll('img');
  for (const img of imgs) {
    if (img.classList.contains('cover-image')) {
      bgImg = img;
      break;
    }
  }
  // Fallback: if not found, leave blank cell
  const imageRow = [bgImg || ''];

  // --- CONTENT ROW ---
  // Find the main card which contains title, subheading, buttons
  let contentCell = '';
  const card = element.querySelector('.card');
  if (card) {
    contentCell = card;
  }
  const contentRow = [contentCell];

  // --- CREATE AND REPLACE ---
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
