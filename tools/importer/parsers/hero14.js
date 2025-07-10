/* global WebImporter */
export default function parse(element, { document }) {
  // The block header must match example EXACTLY
  const headerRow = ['Hero (hero14)'];

  // The structure:
  // <header>
  //   <div class="w-layout-grid grid-layout">
  //     <div> (image)
  //     <div> (headline content)

  // Safely get the grid-layout wrapper
  const gridLayout = element.querySelector(':scope > .w-layout-grid');
  let bgImgEl = null;
  let contentCell = null;

  if (gridLayout) {
    // Get immediate child divs of the grid-layout
    const children = gridLayout.querySelectorAll(':scope > div');
    // First child: image area
    if (children.length > 0) {
      const img = children[0].querySelector('img');
      if (img) {
        bgImgEl = img;
      }
    }
    // Second child: content area
    if (children.length > 1) {
      // The container holding the content (h1, CTA, etc)
      contentCell = children[1];
    }
  }

  // Only include rows if content exists
  const rows = [
    headerRow,
    bgImgEl ? [bgImgEl] : [],
    contentCell ? [contentCell] : []
  ].filter(r => r.length);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
