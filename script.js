// ============================================================
// Belle Martine – Web Design Services
// Cookie consent, navigation, smooth scroll, form handling
// ============================================================

(function () {
  'use strict';

  // ---- Navbar scroll behaviour ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile hamburger menu ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Active nav link on scroll ----
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
  const observer  = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach(s => observer.observe(s));

  // ---- Back-to-top button ----
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Cookie consent banner ----
  const COOKIE_KEY = 'bm_cookie_consent';

  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner && !localStorage.getItem(COOKIE_KEY)) {
    setTimeout(() => cookieBanner.classList.add('visible'), 1200);
  }

  function dismissCookie(accepted) {
    if (!cookieBanner) return;
    localStorage.setItem(COOKIE_KEY, accepted ? 'accepted' : 'declined');
    cookieBanner.classList.remove('visible');
    if (accepted) {
      showToast('🍪 Cookies accepterade – tack!');
    }
  }

  const acceptBtn  = document.querySelector('.btn-cookie-accept');
  const declineBtn = document.querySelector('.btn-cookie-decline');
  if (acceptBtn)  acceptBtn.addEventListener('click',  () => dismissCookie(true));
  if (declineBtn) declineBtn.addEventListener('click', () => dismissCookie(false));

  // ---- Toast notification ----
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✓</span><span>${message}</span>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('visible'));
    });
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 500);
    }, 3500);
  }

  // ---- Contact form ----
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '⏳ Skickar…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        this.reset();
        showToast('✉️ Meddelandet skickat! Jag hör av mig snart.');
      }, 1500);
    });
  }

  // ---- Scroll-reveal animation ----
  const revealEls = document.querySelectorAll(
    '.service-card, .step-card, .why-item, .hero-stats .stat-item'
  );
  const revealObs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealEls.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    revealObs.observe(el);
  });

})();
