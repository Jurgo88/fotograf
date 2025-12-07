import './style.css';
import Masonry from 'masonry-layout';  // cez npm
import { loadImages } from './js/loadImages.js';
import { renderGridLayout } from './js/layoutGrid.js';
import { renderMasonryLayout } from './js/layoutMasonry.js';
import { initLightbox } from './js/lightbox.js';
import { runAnimations } from './js/animations.js';

const images = loadImages();
let glightbox = null;
let msnry = null;


function renderGrid(container) {
  renderGridLayout(container, images);

  // Lightbox + animácie
  glightbox = initLightbox();
  runAnimations();

  // Ak Masonry bola predtým inicializovaná, destroy
  if (msnry) {
    msnry.destroy();
    msnry = null;
  }
}

function renderMasonry(container) {
  renderMasonryLayout(container, images);

  // Inicializujeme Masonry
msnry = new Masonry(container, {
  itemSelector: '.grid-item',
  gutter: 10
});

  // Lightbox + animácie
  glightbox = initLightbox();
  runAnimations();

  // Po loadovaní obrázkov prerender
  window.addEventListener('load', () => {
    msnry.layout();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('photosContainer');
  const masonryToggle = document.getElementById('toggleMasonry');

  if (!container || !masonryToggle) {
    console.error('DOM elements not found!');
    return;
  }

  // default grid
  renderGrid(container);

  // toggle masonry/grid
  masonryToggle.addEventListener('change', () => {
    masonryToggle.checked ? renderMasonry(container) : renderGrid(container);
  });
});
