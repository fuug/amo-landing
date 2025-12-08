(function() {
  const applyState = () => {
    const scrolled = window.scrollY > 2;
    document.body.classList.toggle('scrolled', scrolled);
  };
  applyState();
  window.addEventListener('scroll', applyState, { passive: true });

  const backdrop = document.getElementById('contact-modal');
  const closeBtn = backdrop?.querySelector('[data-close-modal]');
  const openers = document.querySelectorAll('a[href="#contact"], .open-contact-modal');
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const openModal = (ev) => {
    if (ev) ev.preventDefault();
    if (!backdrop) return;
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add('is-open'));
    document.body.classList.add('modal-open');
  };
  const closeModal = () => {
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    setTimeout(() => { backdrop.hidden = true; }, 220);
  };
  openers.forEach(el => el.addEventListener('click', openModal));
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const toggleMobile = () => {
    const isOpen = document.body.classList.toggle('mobile-nav-open');
    if (mobileMenu) {
      mobileMenu.hidden = !isOpen;
      mobileMenu.classList.toggle('is-open', isOpen);
    }
    if (burger) burger.setAttribute('aria-expanded', String(isOpen));
  };
  burger?.addEventListener('click', toggleMobile);
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-open')) toggleMobile();
    });
  });
  document.addEventListener('click', (e) => {
    const isOpen = document.body.classList.contains('mobile-nav-open');
    if (!isOpen) return;
    const target = e.target;
    if (mobileMenu && !mobileMenu.contains(target) && burger && !burger.contains(target)) {
      toggleMobile();
    }
  });
})();

