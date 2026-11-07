// src/js/contactForm.js
// Odoslanie kontaktného formulára na Netlify Forms bez opustenia stránky.
// Po úspechu sa formulár nahradí poďakovaním, pri chybe sa zobrazí hláška.
// Bez JavaScriptu formulár funguje aj naďalej (klasické odoslanie na Netlify).

const ERROR_MESSAGE =
  'Správu sa nepodarilo odoslať. Skúste to prosím znova alebo mi napíšte na ptrzgo@gmail.com.';

export function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (!form || !success) return;

  const button = form.querySelector('.form-submit');
  const errorBox = form.querySelector('.form-status-error');
  const buttonText = button.textContent;

  form.addEventListener('submit', async (event) => {
    // prehliadač už skontroloval povinné polia, inak by sa submit nespustil
    event.preventDefault();

    errorBox.hidden = true;
    button.disabled = true;
    button.textContent = 'Odosielam…';

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      form.reset();
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      console.error('Odoslanie formulára zlyhalo:', error);
      errorBox.textContent = ERROR_MESSAGE;
      errorBox.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = buttonText;
    }
  });
}
