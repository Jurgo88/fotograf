
console.log('Photo gallery script loaded');// src/main.js
import { loadImages } from './js/loadImages.js';
import { renderGridLayout } from './js/layoutGrid.js';
import { renderMasonryLayout } from './js/layoutMasonry.js';
import { initLightbox } from './js/lightbox.js';
import { runAnimations } from './js/animations.js';


const container = document.getElementById('photosContainer');
const masonryToggle = document.getElementById('masonryToggle');


const images = loadImages();
let glightbox = null;


function renderGrid() {
container.classList.remove('masonry');
renderGridLayout(container, images);
glightbox = initLightbox();
runAnimations();
}


function renderMasonry() {
renderMasonryLayout(container, images);
glightbox = initLightbox();
runAnimations();
}


renderGrid();


masonryToggle.addEventListener('change', () => {
masonryToggle.checked ? renderMasonry() : renderGrid();
});