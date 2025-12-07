
export function runAnimations() {
setTimeout(() => {
gsap.from('img', { opacity: 0, duration: 1, stagger: 0.05 });
}, 300);
}