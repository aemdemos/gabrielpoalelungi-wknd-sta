/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we only process elements that have the expected structure
  // Table header (as in example)
  const headerRow = ['Carousel (carousel24)'];

  // Find the card body containing the content
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (required)
  const img = cardBody.querySelector('img');
  // If no image, do not process
  if (!img) return;

  // Find possible heading (optional)
  let heading = cardBody.querySelector('.h4-heading');
  // Only proceed if heading is not empty

  // Prepare text cell content array
  const textCell = [];
  if (heading) {
    textCell.push(heading);
  }
  // If there are other child nodes (except the heading and img), add them as well
  [...cardBody.childNodes].forEach((node) => {
    if (
      node !== img &&
      node !== heading &&
      (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()))
    ) {
      textCell.push(node);
    }
  });

  // The text cell is empty if there's neither heading nor other content
  const slideRow = [img, textCell.length > 0 ? textCell : ''];

  // Build the table
  const cells = [headerRow, slideRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
