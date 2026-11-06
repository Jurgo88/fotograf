const COLUMN_COUNT = 3;
// koľko prvých fotiek sa načíta hneď (sú viditeľné bez scrollovania), zvyšok až pri scrollovaní
const EAGER_COUNT = 6;

/**
 * @param {HTMLElement} container
 * @param {{ url: string, width: number, height: number }[]} images
 */
export function renderGridLayout(container, images) {
  container.innerHTML = '';
  container.classList.remove('masonry');
  container.classList.add('grid');

  const columns = Array.from({ length: COLUMN_COUNT }, () => {
    const col = document.createElement('div');
    col.classList.add('photo-column');
    container.appendChild(col);
    return col;
  });

  // relatívna výška stĺpcov – fotku dáme vždy do najkratšieho, aby stĺpce končili približne rovnako
  const heights = new Array(COLUMN_COUNT).fill(0);

  images.forEach((image, idx) => {
    const img = document.createElement('img');
    img.src = image.url;
    img.alt = `Svadobná fotografia ${idx + 1} – Peter Zigo`;
    img.width = image.width;
    img.height = image.height;
    img.decoding = 'async';
    img.loading = idx < EAGER_COUNT ? 'eager' : 'lazy';
    if (idx < COLUMN_COUNT) img.fetchPriority = 'high';
    img.classList.add('glightbox');
    img.setAttribute('data-gallery', 'gallery1');

    const target = heights.indexOf(Math.min(...heights));
    columns[target].appendChild(img);
    heights[target] += image.height / image.width;
  });
}
