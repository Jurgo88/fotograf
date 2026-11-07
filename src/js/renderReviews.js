// src/js/renderReviews.js
const MONTHS = [
  'január', 'február', 'marec', 'apríl', 'máj', 'jún',
  'júl', 'august', 'september', 'október', 'november', 'december',
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// "2025-08" -> "august 2025", "2025" -> "2025"
function formatDate(value) {
  const match = value.match(/^(\d{4})(?:-(\d{1,2}))?/);
  if (!match) return value;
  const month = match[2] ? MONTHS[parseInt(match[2], 10) - 1] : null;
  return month ? `${month} ${match[1]}` : match[1];
}

export function renderReviews(container, reviews) {
  container.innerHTML = '';

  if (!reviews.length) {
    container.innerHTML = '<p class="reviews-empty">Recenzie pripravujeme.</p>';
    return;
  }

  reviews.forEach((review) => {
    const card = document.createElement('article');
    card.className = 'review-card';

    // odstavce oddelené prázdnym riadkom
    const paragraphs = review.text
      .split(/\r?\n\s*\r?\n/)
      .map((p) => `<p>${escapeHtml(p.trim()).replace(/\r?\n/g, '<br>')}</p>`)
      .join('');

    const details = [review.place, review.date && formatDate(review.date)]
      .filter(Boolean)
      .map(escapeHtml)
      .join(' · ');

    card.innerHTML = `
      ${review.photo ? `<img class="review-photo" src="${review.photo}" alt="${escapeHtml(review.names)}" loading="lazy">` : ''}
      <div class="review-text">${paragraphs}</div>
      <footer class="review-meta">
        ${review.names ? `<p class="review-names">${escapeHtml(review.names)}</p>` : ''}
        ${details ? `<p class="review-details">${details}</p>` : ''}
      </footer>
    `;

    container.appendChild(card);
  });
}
