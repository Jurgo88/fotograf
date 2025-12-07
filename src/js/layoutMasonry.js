export function renderMasonryLayout(container, images) {
  container.innerHTML = '';
  container.classList.remove('grid');  // odstrániť grid class
  container.classList.add('masonry');  // pridáme masonry class
  container.classList.remove('d-flex', 'flex-column', 'flex-lg-row');
container.classList.add('masonry');


  images.forEach((url) => {
    const item = document.createElement('div');
    item.classList.add('grid-item');

    const img = document.createElement('img');
    img.src = url;
    img.classList.add('glightbox');
    item.appendChild(img);

    container.appendChild(item);
  });
}
