export function renderGridLayout(container, images) {
  container.innerHTML = '';
  container.classList.remove('masonry');
  container.classList.add('grid');

  // Vytvoríme 3 stĺpce
  const columns = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
  columns.forEach((col, i) => {
    col.classList.add('photo-column');
    container.appendChild(col);
  });

  // Vytvoríme obrázky a pridáme ich do stĺpcov
  images.forEach((url, idx) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Foto ${idx + 1}`;
    img.classList.add('glightbox');
    img.setAttribute('data-gallery', 'gallery1');

    const col = columns[idx % columns.length];
    col.appendChild(img);
  });
}
