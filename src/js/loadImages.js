// src/js/loadImages.js
export function loadImages() {
const modules = import.meta.glob('/src/img/gallery/*.{jpg,jpeg,png,webp}', {
eager: true,
as: 'url'
});
return Object.values(modules);
}