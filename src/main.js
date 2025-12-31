import './style.css';
import './css/about.css'
import Masonry from 'masonry-layout';  // cez npm
import { prepinac } from './js/prepinac.js';
import { loadImages } from './js/loadImages.js';
import { renderGridLayout } from './js/layoutGrid.js';
import { renderMasonryLayout } from './js/layoutMasonry.js';
import { initLightbox } from './js/lightbox.js';
import { runAnimations } from './js/animations.js';

const images = loadImages('home');
const imagesGallery = loadImages('gallery');
let glightbox = null;
let msnry = null;
const galleryContainer = document.getElementById('galleryContainer');
const container = document.getElementById('photosContainer');


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

function clearContainer() {
  container.innerHTML = '';
  if (glightbox) {
    glightbox.destroy();
    glightbox = null;
  }
}

function renderGallery() {
  clearContainer();
  renderGridLayout(galleryContainer, imagesGallery);
  glightbox = initLightbox();
  runAnimations();
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
  // const masonryToggle = document.getElementById('toggleMasonry');

  // if (!container || !masonryToggle) {
  //   console.error('DOM elements not found!');
  //   return;
  // }

  // default grid
  renderGrid(container);

  //render gallery on click gallery nav link
  const galleryLink = document.getElementById('galleryLink');
  if (galleryLink) {
    galleryLink.addEventListener('click', (e) => {
      e.preventDefault();
      //     console.log    ('Gallery link clicked');
      renderGallery();
    });
  } else {
    console.error('Element with ID "galleryLink" not found!');
  }

  // init menu switching
  prepinac();

  //if 5 times cliks on class logo render masonry
  const logo = document.querySelector('.LOGO');
  let clickCount = 0;

  logo.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
      // renderMasonry(container);
      alert('Neklikaj toľko a objednaj si fotenie! 😊');
      // renderMasonry(container);
    }
  });

  // toggle masonry/grid
  // masonryToggle.addEventListener('change', () => {
  //   masonryToggle.checked ? renderMasonry(container) : renderGrid(container);
  // });
});

document.querySelectorAll('.sidebar nav a').forEach(link => {
  link.addEventListener('click', () => {
    const offcanvasEl = document.getElementById('menuOffcanvas');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) bsOffcanvas.hide();
  });
});

// on click btn-close hide offcanvas
document.querySelectorAll('.btn-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const offcanvasEl = document.getElementById('menuOffcanvas');
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
    bsOffcanvas.hide();
  });
});

