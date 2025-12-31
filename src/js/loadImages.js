// src/js/loadImages.js
export function loadImages(value) {
    // Import all images from the 'src/img' directory
    const modules = import.meta.glob('/src/img/**/*.{jpg,jpeg,png,webp}', {
        eager: true,
        as: 'url'
    });

    // Filter images based on the provided value (subdirectory)
    const filteredImages = Object.keys(modules)
        .filter((path) => value ? path.includes(`/src/img/${value}/`) : true)
        .map((path) => modules[path]);

    return filteredImages;
}