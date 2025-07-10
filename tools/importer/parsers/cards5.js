/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards5)'];
  const rows = [headerRow];

  // Get all direct card links
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.card-link'));

  cardLinks.forEach(card => {
    // Image (first direct child div, then img inside)
    const imageWrapper = card.querySelector(':scope > div');
    let img = null;
    if (imageWrapper) {
      img = imageWrapper.querySelector('img');
    }
    // Text content (second direct child div)
    const textWrapper = card.querySelector(':scope > div.utility-padding-all-1rem');
    const textContent = [];
    if (textWrapper) {
      // Tag (optional)
      const tag = textWrapper.querySelector('.tag-group .tag');
      if (tag) {
        const tagDiv = document.createElement('div');
        tagDiv.textContent = tag.textContent.toUpperCase();
        textContent.push(tagDiv);
      }

      // Heading (optional)
      const heading = textWrapper.querySelector('h3, .h4-heading');
      if (heading) {
        // Use strong for close visual match, but reference the actual element if possible
        const headingEl = document.createElement('strong');
        headingEl.textContent = heading.textContent;
        textContent.push(headingEl);
      }

      // Description (optional)
      const desc = textWrapper.querySelector('p, .paragraph-sm');
      if (desc) {
        textContent.push(document.createElement('br'));
        textContent.push(document.createTextNode(desc.textContent));
      }
    }
    // Remove any trailing <br> if description wasn't present
    if (textContent.length > 1 && textContent[textContent.length-1].nodeType === 3 && textContent[textContent.length-2].tagName === 'BR') {
      // Okay
    } else if (textContent.length > 0 && textContent[textContent.length-1].tagName === 'BR') {
      textContent.pop();
    }
    // Each row: [img, textContent]
    rows.push([
      img || '',
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
