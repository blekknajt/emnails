(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* --- Mobile Navigation --- */
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('site-menu');

  if (toggle && menu) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('is-open', !expanded);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (
        menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && menu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* --- Gallery Category Filters --- */
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const chosen = btn.getAttribute('data-filter');
        filterButtons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', String(active));
        });

        galleryItems.forEach((item) => {
          const cat = item.getAttribute('data-category');
          const visible = chosen === 'wszystkie' || cat === chosen;
          item.classList.toggle('is-hidden', !visible);
          if (visible) {
            item.classList.add('is-visible');
          }
        });
      });
    });
  }

  /* --- Accessible Gallery Lightbox (<dialog>) --- */
  const dialog = document.getElementById('gallery-lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    const imgEl = dialog.querySelector('[data-lightbox-img]');
    const titleEl = dialog.querySelector('[data-lightbox-title]');
    const descEl = dialog.querySelector('[data-lightbox-desc]');
    const tagEl = dialog.querySelector('[data-lightbox-tag]');
    const counterEl = dialog.querySelector('[data-lightbox-counter]');
    const closeBtn = dialog.querySelector('[data-lightbox-close]');
    const prevBtn = dialog.querySelector('[data-lightbox-prev]');
    const nextBtn = dialog.querySelector('[data-lightbox-next]');

    let activeTriggers = [];
    let currentIndex = 0;
    let lastFocused = null;

    const getVisibleTriggers = () =>
      Array.from(document.querySelectorAll('[data-lightbox-open]')).filter((btn) => {
        const parent = btn.closest('.gallery-item');
        return !parent || !parent.classList.contains('is-hidden');
      });

    const render = (index) => {
      if (!activeTriggers.length) return;
      currentIndex = (index + activeTriggers.length) % activeTriggers.length;
      const trigger = activeTriggers[currentIndex];
      const src = trigger.getAttribute('data-lightbox-src') || '';
      const title = trigger.getAttribute('data-lightbox-title') || '';
      const desc = trigger.getAttribute('data-lightbox-desc') || '';
      const tag = trigger.getAttribute('data-lightbox-tag') || '';

      imgEl.src = src;
      imgEl.alt = title;
      titleEl.textContent = title;
      descEl.textContent = desc;
      tagEl.textContent = tag;
      counterEl.textContent = `${currentIndex + 1} / ${activeTriggers.length}`;
    };

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-lightbox-open]');
      if (!trigger) return;
      activeTriggers = getVisibleTriggers();
      const idx = activeTriggers.indexOf(trigger);
      lastFocused = trigger;
      render(idx >= 0 ? idx : 0);
      dialog.showModal();
    });

    closeBtn.addEventListener('click', () => dialog.close());
    prevBtn.addEventListener('click', () => render(currentIndex - 1));
    nextBtn.addEventListener('click', () => render(currentIndex + 1));

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog || e.target.classList.contains('lightbox__stage')) {
        dialog.close();
      }
    });

    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        render(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        render(currentIndex + 1);
      }
    });

    dialog.addEventListener('close', () => {
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    });
  }

  /* --- Scroll Reveal --- */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reveals.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.08 }
      );
      reveals.forEach((el) => observer.observe(el));
    }
  }
})();
