// Once the page (and all its assets) has fully loaded: freeze the spin in
// place, hold for a beat, play exactly one quick bouncy 180° turn, hold
// again, then fade out (same white-flash style as the other pages).
//
// Exception: if we arrived here via an in-site link (e.g. clicking "Work"
// in the nav from another page), skip the whole "Blooming..." sequence —
// that's reserved for a fresh/direct visit to the homepage. Remove the
// loading screen immediately so the lighter page-flash (already on this
// page, same as every other page) is the only transition seen.
(() => {
  let cameFromSameSite = false;
  try {
    cameFromSameSite = !!document.referrer && new URL(document.referrer).origin === location.origin;
  } catch (e) {
    cameFromSameSite = false;
  }

  // Lets the hero's entrance animations (the flower vines) hold still until
  // the loading screen is out of the way.
  const startHero = () => document.body.classList.add('is-loaded');

  if (cameFromSameSite) {
    const screen = document.getElementById('loadingScreen');
    if (screen) screen.remove();
    startHero();
    return;
  }

  window.addEventListener('load', () => {
    const screen = document.getElementById('loadingScreen');
    if (!screen) return;
    const img = screen.querySelector('img');

    // Freeze the spin by reading the flower's ACTUAL current angle and
    // pinning it there with an inline transform. Pausing the CSS animation
    // alone left the end angle at the mercy of main-thread lag — however
    // late this code runs, we now capture wherever the flower really is.
    let angle = 0;
    try {
      const m = new DOMMatrixReadOnly(getComputedStyle(img).transform);
      angle = Math.atan2(m.b, m.a) * 180 / Math.PI;
      if (angle < 0) angle += 360;
    } catch (e) {}
    img.style.animation = 'none';
    img.style.transform = `rotate(${angle}deg)`;

    setTimeout(() => {
      // One bouncy turn that ALWAYS lands upright: snap to the nearest
      // half-turn, plus exactly one more 180°. End orientation is now
      // deterministic no matter where the spin was frozen.
      const target = Math.round(angle / 180) * 180 + 180;
      img.style.transition = 'transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
      img.style.transform = `rotate(${target}deg)`;

      setTimeout(() => {
        // Hold for a beat after the turn finishes, then fade out.
        setTimeout(() => {
          screen.classList.add('is-hidden');
          // Kick off the hero animations as the curtain starts lifting.
          startHero();
          screen.addEventListener('transitionend', () => screen.remove(), { once: true });
        }, 500);
      }, 1500);
    }, 500);
  });
})();
