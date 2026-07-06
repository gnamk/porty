// Case study table of contents: smooth scroll + scroll-spy.
// Shared by every case study page (same behavior as Satori's ToC).
(() => {
  const tocLinks = Array.from(document.querySelectorAll('.cs2-toc a'));
  const tocIndicator = document.getElementById('csTocIndicator');
  const tocSections = tocLinks
    .map(a => document.getElementById(a.dataset.target))
    .filter(Boolean);

  // Indicator cycles pink → blue → purple (looping) each time the active
  // section changes, whether by scroll-spy or by clicking a ToC link.
  const tocFlowers = ['pink', 'blue', 'purple'];
  let tocFlowerIndex = 0;
  let tocCurrentLink = null;

  function setActiveTocLink(link) {
    if (!link) return;
    tocLinks.forEach(a => a.classList.remove('is-active'));
    link.classList.add('is-active');

    if (link !== tocCurrentLink) {
      if (tocCurrentLink !== null) {
        tocFlowerIndex = (tocFlowerIndex + 1) % tocFlowers.length;
      }
      tocCurrentLink = link;
      if (tocIndicator) {
        tocIndicator.classList.remove('flower-pink', 'flower-blue', 'flower-purple');
        tocIndicator.classList.add('flower-' + tocFlowers[tocFlowerIndex]);
      }
    }

    if (tocIndicator) {
      tocIndicator.style.opacity = '1';
      tocIndicator.style.transform = `translateY(${link.offsetTop}px)`;
    }
  }

  tocLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.target);
      if (!target) return;
      // Land on the section's orange heading itself, not the section box
      // (whose top includes the divider rule above the heading).
      const heading = target.querySelector('h2') || target;
      const navEl = document.querySelector('.nav');
      const navH = navEl ? navEl.offsetHeight : 0;
      const y = heading.getBoundingClientRect().top + window.scrollY - navH - 24;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  if (tocSections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = tocLinks.find(a => a.dataset.target === entry.target.id);
          if (link) setActiveTocLink(link);
        }
      });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

    tocSections.forEach(sec => sectionObserver.observe(sec));
  }

  if (tocLinks[0]) setActiveTocLink(tocLinks[0]);
})();
