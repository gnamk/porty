// Smooth, eased mouse-wheel scrolling site-wide.
// Intercepts wheel input and lerps the real scroll position toward a target,
// giving scrolling a slight delay/glide instead of snapping instantly.
(function () {
  let current = window.scrollY;
  let target = current;
  let ticking = false;
  const ease = 0.08; // lower = more lag, higher = snappier

  function maxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function clamp(y) {
    return Math.max(0, Math.min(y, maxScroll()));
  }

  function normalizeDelta(e) {
    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 16;        // line mode
    else if (e.deltaMode === 2) delta *= window.innerHeight; // page mode
    return delta;
  }

  function animate() {
    current += (target - current) * ease;

    if (Math.abs(target - current) < 0.5) {
      current = target;
      window.scrollTo({ top: current, left: 0, behavior: 'instant' });
      ticking = false;
      return;
    }

    window.scrollTo({ top: current, left: 0, behavior: 'instant' });
    requestAnimationFrame(animate);
  }

  function onWheel(e) {
    e.preventDefault();

    if (!ticking) {
      current = window.scrollY;
      target = current;
    }

    target = clamp(target + normalizeDelta(e));

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(animate);
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false });

  window.addEventListener('resize', () => {
    target = clamp(target);
  });
})();
