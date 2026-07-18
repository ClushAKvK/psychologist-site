(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');

  const closeMenu = () => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
      menu.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1060) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  document.querySelectorAll('[data-slider-prev], [data-slider-next]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.sliderPrev || button.dataset.sliderNext;
      const slider = document.getElementById(targetId);
      if (!slider) return;
      const direction = button.hasAttribute('data-slider-prev') ? -1 : 1;
      const card = slider.firstElementChild;
      const gap = parseFloat(getComputedStyle(slider).columnGap || '18');
      const distance = card ? card.getBoundingClientRect().width + gap : slider.clientWidth * 0.8;
      slider.scrollBy({ left: direction * distance, behavior: 'smooth' });
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  revealItems.forEach((item) => {
    const delay = item.dataset.delay;
    if (delay) item.style.setProperty('--delay', `${delay}ms`);
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
})();
