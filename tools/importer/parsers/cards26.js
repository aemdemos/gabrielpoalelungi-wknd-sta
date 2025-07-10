/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const cells = [['Cards (cards26)']];

  // Get all direct children (each is a 'card')
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Only process cards with an image (per spec)
    if (!img) return;

    // Try to get the typical text wrapper on this card
    let textContent = '';
    let textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      // Reference the EXISTING text container
      textContent = textContainer;
    } else {
      // Try for another possible wrapper
      textContainer = cardDiv.querySelector('.utility-position-relative');
      if (textContainer) {
        textContent = textContainer;
      } else {
        // Fallback: collect all h3/h2/h4 and p inside cardDiv
        const frag = document.createElement('div');
        cardDiv.querySelectorAll('h3, h2, h4, h5, h6, p').forEach(e => frag.appendChild(e));
        if (frag.childNodes.length) textContent = frag;
      }
    }
    cells.push([
      img,
      textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
