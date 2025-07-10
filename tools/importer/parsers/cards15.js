/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per requirements
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];
  // Select all direct card links
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach((card) => {
    // Image (first .utility-aspect-2x3 img in card)
    const imgWrapper = card.querySelector('.utility-aspect-2x3');
    let image = null;
    if (imgWrapper) {
      image = imgWrapper.querySelector('img');
    }
    // Text content: meta (tag/date) and title
    const flex = card.querySelector('.flex-horizontal');
    // Compose meta (tag and date) as elements for robust handling
    let metaDiv = null;
    if (flex) {
      const tag = flex.querySelector('.tag');
      const date = flex.querySelector('.paragraph-sm');
      metaDiv = document.createElement('div');
      if (tag) {
        // Use the existing tag element directly (don't clone)
        metaDiv.appendChild(tag);
      }
      if (date) {
        if (tag) {
          // Add space between tag and date
          metaDiv.appendChild(document.createTextNode(' '));
        }
        metaDiv.appendChild(date);
      }
    }
    // Title
    const title = card.querySelector('h3, .h4-heading');
    // Compose the text cell
    const textCellContent = [];
    if (metaDiv && (metaDiv.childNodes.length > 0)) {
      textCellContent.push(metaDiv);
    }
    if (title) {
      textCellContent.push(title);
    }
    rows.push([image, textCellContent]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
