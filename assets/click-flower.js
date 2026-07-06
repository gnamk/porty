// Spawns a small flower-logo mark at the click point that lingers for
// 0.2s, then slides upward while fading out. Sized to match the custom
// cursor's inner dot (doubled).
(function () {
  function spawnFlower(x, y) {
    var img = document.createElement('img');
    img.src = 'assets/click-flower.png';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.draggable = false;
    img.className = 'click-flower';
    img.style.left = x + 'px';
    img.style.top  = y + 'px';
    document.body.appendChild(img);

    setTimeout(function () {
      img.classList.add('is-fading');
      img.addEventListener('transitionend', function () {
        img.remove();
      }, { once: true });
      // Fallback in case transitionend doesn't fire
      setTimeout(function () { img.remove(); }, 500);
    }, 200);
  }

  document.addEventListener('click', function (e) {
    spawnFlower(e.clientX, e.clientY);
  });
})();
