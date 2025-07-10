/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get all immediate child divs (each contains an image)
  const imageDivs = Array.from(element.querySelectorAll(':scope > div'));
  // 2. Extract all img elements from those divs, keeping their original order
  const images = imageDivs
    .map(div => div.querySelector('img'))
    .filter(Boolean);

  // 3. Build the image content for the cell
  // If only one image, use it directly. If multiple, use a fragment.
  let imageContent = '';
  if (images.length === 1) {
    imageContent = images[0];
  } else if (images.length > 1) {
    const fragment = document.createDocumentFragment();
    images.forEach(img => fragment.appendChild(img));
    imageContent = fragment;
  }

  // 4. The structure is:
  // Row 1: Header (string)
  // Row 2: Image(s)
  // Row 3: Content (none present in source, so empty string)
  const cells = [
    ['Hero (hero1)'],
    [imageContent],
    ['']
  ];

  // 5. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
