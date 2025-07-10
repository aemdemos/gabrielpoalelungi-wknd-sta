/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row
  const rows = [['Cards']];
  // Each immediate child of element is a card
  const cards = element.querySelectorAll(':scope > div');
  cards.forEach((card) => {
    // Find the <p> inside the card for the description text
    const p = card.querySelector('p');
    if (p) {
      // Reference the existing <p> for semantic meaning
      rows.push([p]);
    }
  });
  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
