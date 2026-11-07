import './style.css';
import './css/about.css'
import Masonry from 'masonry-layout';  // cez npm
import { prepinac } from './js/prepinac.js';
import { loadImages } from './js/loadImages.js';
import { renderGridLayout } from './js/layoutGrid.js';
import { renderMasonryLayout } from './js/layoutMasonry.js';
import { initLightbox } from './js/lightbox.js';
import { runAnimations } from './js/animations.js';
import { initContactForm } from './js/contactForm.js';

const images = loadImages('home');
const imagesGallery = loadImages('gallery');
let glightbox = null;
let msnry = null;
let galleryMode = null; // 'home' = výber na úvode, 'full' = celá galéria
const galleryContainer = document.getElementById('galleryContainer');
const container = document.getElementById('photosContainer');
const showMoreBtn = document.getElementById('showMoreBtn');

function refreshLightbox() {
  if (glightbox) glightbox.destroy();
  glightbox = initLightbox();
}

// úvod: výber fotiek zo src/img/home + tlačidlo "Zobraziť viac"
function showHome() {
  if (galleryMode === 'home') return;
  galleryMode = 'home';

  if (msnry) {
    msnry.destroy();
    msnry = null;
  }
  galleryContainer.innerHTML = '';
  renderGridLayout(container, images);
  if (showMoreBtn) showMoreBtn.style.display = 'inline';

  refreshLightbox();
  runAnimations(container);
}

// #galeria: všetky fotky zo src/img/gallery
function showFullGallery() {
  if (galleryMode === 'full') return;
  galleryMode = 'full';

  container.innerHTML = '';
  renderGridLayout(galleryContainer, imagesGallery);
  if (showMoreBtn) showMoreBtn.style.display = 'none';

  refreshLightbox();
  runAnimations(galleryContainer);
}

function renderMasonry(container) {
  renderMasonryLayout(container, images);

  // Inicializujeme Masonry
msnry = new Masonry(container, {
  itemSelector: '.grid-item',
  gutter: 10
});

  // Lightbox + animácie
  refreshLightbox();
  runAnimations(container);

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

  // prepínanie sekcií podľa adresy (#galeria, #o-mne, #kontakt).
  // Galéria sa vykreslí až keď je potrebná – kto otvorí priamo #kontakt, nesťahuje fotky.
  const router = prepinac((route) => {
    if (route === '') showHome();
    if (route === 'galeria') showFullGallery();
  });

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => router.navigate('galeria'));
  }

  initContactForm();

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

