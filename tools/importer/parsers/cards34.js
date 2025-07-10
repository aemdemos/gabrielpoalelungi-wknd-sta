/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row matching the required block name
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Each card is a direct child <a>
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Image in first cell
    const img = card.querySelector('img');

    // Second cell: text content
    const textCellElements = [];
    const contentWrap = card.querySelector('div > div');
    if (!contentWrap) {
      rows.push([img, '']);
      return;
    }

    // Tag and read time row (optional)
    const tagContainer = contentWrap.querySelector('.flex-horizontal');
    if (tagContainer) {
      // Tag
      const tagEl = tagContainer.querySelector('.tag div');
      if (tagEl) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tagEl.textContent;
        tagSpan.style.textTransform = 'uppercase';
        tagSpan.style.fontSize = '0.85em';
        tagSpan.style.fontWeight = 'bold';
        textCellElements.push(tagSpan);
        textCellElements.push(document.createTextNode(' '));
      }
      // Read time
      const readTime = tagContainer.querySelector('.paragraph-sm');
      if (readTime && readTime.textContent.trim()) {
        const timeSpan = document.createElement('span');
        timeSpan.textContent = readTime.textContent.trim();
        timeSpan.style.fontSize = '0.85em';
        textCellElements.push(timeSpan);
      }
      // Line break only if tag or time was found
      if (textCellElements.length > 0) {
        textCellElements.push(document.createElement('br'));
      }
    }

    // Title: prefer <h3>, fallback to <h4>, etc.
    let title = contentWrap.querySelector('h3, h4, h2, h1');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textCellElements.push(strong);
      textCellElements.push(document.createElement('br'));
    }

    // Description (p)
    const desc = contentWrap.querySelector('p');
    if (desc && desc.textContent.trim()) {
      textCellElements.push(desc);
      textCellElements.push(document.createElement('br'));
    }

    // CTA: Look for last <div> inside contentWrap whose text is 'Read'
    let cta = null;
    const innerDivs = Array.from(contentWrap.querySelectorAll('div'));
    if (innerDivs.length) {
      // Find the last div that says 'Read' (case-insensitive)
      for (let i = innerDivs.length - 1; i >= 0; i--) {
        if (innerDivs[i].textContent.trim().toLowerCase() === 'read') {
          cta = innerDivs[i];
          break;
        }
      }
    }
    if (cta) {
      const link = document.createElement('a');
      link.href = card.getAttribute('href') || '#';
      link.textContent = cta.textContent.trim();
      textCellElements.push(link);
    }

    // Remove trailing <br>
    while (textCellElements.length > 0 && textCellElements[textCellElements.length - 1].tagName === 'BR') {
      textCellElements.pop();
    }

    rows.push([
      img,
      textCellElements
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
