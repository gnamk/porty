// Compacts the nav into a centered floating pill once the page is
// scrolled down, reverting to the full-width bar back at the top.
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  // Separate on/off thresholds (instead of one shared value) so scroll
  // position hovering right at the boundary can't rapidly re-toggle the
  // class and restart the transition every frame.
  var ON  = 40;
  var OFF = 16;

  var ticking = false;

  function apply() {
    var y = window.scrollY;
    var isCompact = nav.classList.contains('is-compact');
    if (!isCompact && y > ON) {
      nav.classList.add('is-compact');
    } else if (isCompact && y < OFF) {
      nav.classList.remove('is-compact');
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  }

  apply();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
