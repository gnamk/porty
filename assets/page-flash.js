// Quick white flash for non-homepage pages: covers the page, then fades
// away once everything has loaded.
window.addEventListener('load', () => {
  const flash = document.getElementById('pageFlash');
  if (!flash) return;

  flash.classList.add('is-hidden');
  flash.addEventListener('transitionend', () => flash.remove(), { once: true });
});
