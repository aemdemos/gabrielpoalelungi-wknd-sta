/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row exactly as in the example
  const rows = [['Cards (cards35)']];
  // Get all direct card containers
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card (mandatory for this block)
    const img = cardDiv.querySelector('img');
    // Try to find all content that is not the image to go in the second cell
    // (e.g., headings, paragraphs, etc.)
    // In this HTML, only the image is present, so cell will be empty
    let textCellContent = [];
    // Collect all direct children except images
    const nonImgChildren = Array.from(cardDiv.children).filter(child => child.tagName.toLowerCase() !== 'img');
    if (nonImgChildren.length > 0) {
      textCellContent = nonImgChildren;
    } else {
      // If there's text nodes only (no block children), collect trimmed text
      const possibleText = Array.from(cardDiv.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
        .map(n => n.textContent.trim());
      if (possibleText.length > 0) {
        textCellContent = [possibleText.join(' ')];
      }
    }
    rows.push([
      img,
      textCellContent.length > 0 ? textCellContent : ''
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
