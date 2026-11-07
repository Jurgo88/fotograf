// src/js/loadReviews.js
// Načíta recenzie zo súborov v src/reviews/*.md (podobne ako loadImages načítava fotky).
// Súbory začínajúce podčiarkovníkom (napr. _vzor.md) sa ignorujú.

const files = import.meta.glob(['/src/reviews/*.md', '!/src/reviews/_*.md'], {
  eager: true,
  query: '?raw',
  import: 'default',
});

const photos = import.meta.glob('/src/reviews/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const fileName = (path) => path.split('/').pop();

// Rozdelí súbor na hlavičku (--- kľúč: hodnota ---) a text recenzie
function parseReview(raw) {
  const match = raw.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, text: raw.trim() };

  const meta = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (key) meta[key] = value;
  });

  return { meta, text: match[2].trim() };
}

export function loadReviews() {
  const photoByName = {};
  Object.entries(photos).forEach(([path, url]) => {
    photoByName[fileName(path).toLowerCase()] = url;
  });

  return Object.entries(files)
    .filter(([path]) => !fileName(path).startsWith('_'))
    .map(([path, raw]) => {
      const { meta, text } = parseReview(raw);
      return {
        id: fileName(path).replace(/\.md$/, ''),
        names: meta.mena || '',
        date: meta.datum || '',
        place: meta.miesto || '',
        photo: meta.foto ? photoByName[meta.foto.toLowerCase()] || null : null,
        text,
      };
    })
    .filter((review) => review.text)
    // najnovšie hore (datum vo formáte RRRR-MM)
    .sort((a, b) => b.date.localeCompare(a.date));
}
