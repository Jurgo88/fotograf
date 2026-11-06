// src/js/loadImages.js
// Načíta fotky z priečinkov src/img/home a src/img/gallery.
// Každá fotka je objekt { url, width, height } (rozmery dopĺňa plugin vo vite.config.js).
// Do buildu sa dostanú len tieto dva priečinky, nie ostatné obrázky zo src/img.
const modules = import.meta.glob(
  [
    '/src/img/home/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
    '/src/img/gallery/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  ],
  { eager: true, query: '?size', import: 'default' }
);

/** @param {'home' | 'gallery'} folder */
export function loadImages(folder) {
  return Object.keys(modules)
    .filter((path) => path.startsWith(`/src/img/${folder}/`))
    .sort()
    .map((path) => modules[path]);
}
