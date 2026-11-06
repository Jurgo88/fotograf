// Jemné postupné zobrazenie fotiek v danom kontajneri (logo a ostatné obrázky sa neanimujú)
export function runAnimations(container) {
  const images = container.querySelectorAll('img');
  if (!images.length || typeof gsap === 'undefined') return;

  setTimeout(() => {
    gsap.from(images, { opacity: 0, duration: 1, stagger: 0.05 });
  }, 300);
}
