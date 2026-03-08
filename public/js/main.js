/* ============================================
   KULVIO — Main JS
   ============================================ */

(function () {
  'use strict';

  // --- Active nav link based on current path ---
  var path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__link, .mobile-menu__link').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (href !== '/' && path.startsWith(href))) a.classList.add('active');
  });

  // --- Scroll reveal ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Nav scroll effect (sentinel-based, no scroll listener) ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:20px;pointer-events:none';
    document.body.prepend(sentinel);
    const navObserver = new IntersectionObserver(
      ([entry]) => { nav.classList.toggle('scrolled', !entry.isIntersecting); },
      { threshold: 0 }
    );
    navObserver.observe(sentinel);
  }

  // --- Mobile menu ---
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Counter animation (eased) ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const easeOutQuart = function (t) { return 1 - Math.pow(1 - t, 4); };
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            const duration = 1600;
            var start = null;
            var tick = function (ts) {
              if (!start) start = ts;
              var progress = Math.min((ts - start) / duration, 1);
              el.textContent = Math.round(easeOutQuart(progress) * target);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  // --- FAQ accordion ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all siblings
      item.parentElement.querySelectorAll('.faq-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Contact form ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const errorEl = document.getElementById('form-error');
      const btnText = btn.innerHTML;

      // Reset error state
      if (errorEl) { errorEl.style.display = 'none'; errorEl.textContent = ''; }

      // Get Turnstile token
      const token = form.querySelector('[name="cf-turnstile-response"]')?.value;
      if (!token) {
        if (errorEl) { errorEl.textContent = 'Completa la verificación de seguridad.'; errorEl.style.display = 'block'; }
        return;
      }

      // Disable button, show loading
      btn.disabled = true;
      btn.innerHTML = 'Enviando…';

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            company: form.querySelector('#company').value,
            interest: form.querySelector('#interest').value,
            message: form.querySelector('#message').value,
            'cf-turnstile-response': token,
          }),
        });
        const data = await res.json();

        if (data.success) {
          form.style.display = 'none';
          const success = document.querySelector('.form-success');
          if (success) success.classList.add('show');
        } else {
          if (errorEl) { errorEl.textContent = data.error || 'Error al enviar. Intenta de nuevo.'; errorEl.style.display = 'block'; }
          if (window.turnstile) turnstile.reset();
        }
      } catch (_) {
        if (errorEl) { errorEl.textContent = 'Error de conexión. Intenta de nuevo.'; errorEl.style.display = 'block'; }
        if (window.turnstile) turnstile.reset();
      } finally {
        btn.disabled = false;
        btn.innerHTML = btnText;
      }
    });
  }
})();
