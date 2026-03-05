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

  // --- Pricing calculator ---
  var calcEl = document.getElementById('pricing-calc');
  if (calcEl) {
    // Starter: 8 UF base, 3 incluidos, 1.5 UF/extra
    // Growth: 20 UF base, 10 incluidos, descuentos progresivos por volumen
    var STARTER = { basePriceUF: 8, includedUsers: 3, extraUserPriceUF: 1.5 };
    var GROWTH = { basePriceUF: 20, includedUsers: 10 };
    var GROWTH_VOLUME = [
      { upTo: 25,  priceUF: 1.00 },
      { upTo: 60,  priceUF: 0.85 },
      { upTo: 150, priceUF: 0.70 },
      { upTo: 300, priceUF: 0.55 }
    ];

    function calculatePriceByUsers(users) {
      users = Math.max(1, Math.min(300, Math.round(users)));

      // Starter price
      var starterPrice = STARTER.basePriceUF + Math.max(0, users - STARTER.includedUsers) * STARTER.extraUserPriceUF;

      // Growth price (progressive volume discounts)
      var growthPrice = GROWTH.basePriceUF;
      var remaining = Math.max(0, users - GROWTH.includedUsers);
      var prev = GROWTH.includedUsers;
      for (var i = 0; i < GROWTH_VOLUME.length && remaining > 0; i++) {
        var tierCap = GROWTH_VOLUME[i].upTo - prev;
        var inTier = Math.min(remaining, tierCap);
        growthPrice += inTier * GROWTH_VOLUME[i].priceUF;
        remaining -= inTier;
        prev = GROWTH_VOLUME[i].upTo;
      }

      // Growth becomes cheaper at 14+ users
      var isGrowth = users >= 14;
      var totalUF = isGrowth ? growthPrice : starterPrice;
      totalUF = Math.round(totalUF * 10) / 10;

      return {
        totalUF: totalUF,
        planName: isGrowth ? 'Growth' : 'Starter',
        pricePerUserUF: Math.round((totalUF / users) * 100) / 100,
        isEnterpriseEstimate: users > 150
      };
    }

    function formatUF(value) {
      if (value % 1 === 0) return value.toLocaleString('es-CL');
      return value.toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }

    var slider = document.getElementById('user-slider');
    var numberInput = document.getElementById('user-count');
    var btnMinus = document.getElementById('calc-minus');
    var btnPlus = document.getElementById('calc-plus');
    var priceEl = document.getElementById('calc-price');
    var planEl = document.getElementById('calc-plan-name');
    var perUserEl = document.getElementById('calc-per-user');
    var enterpriseNote = document.getElementById('calc-enterprise-note');
    var ctaEl = document.getElementById('calc-cta');

    function updateCalc(users) {
      users = Math.max(1, Math.min(300, Math.round(users) || 1));
      slider.value = users;
      numberInput.value = users;
      var result = calculatePriceByUsers(users);
      priceEl.textContent = formatUF(result.totalUF);
      planEl.textContent = result.planName;
      perUserEl.textContent = formatUF(result.pricePerUserUF) + ' UF por usuario';
      if (result.isEnterpriseEstimate) {
        enterpriseNote.hidden = false;
        priceEl.parentElement.querySelector('.pricing-calc__price-unit').textContent = 'UF/mes (est.)';
        ctaEl.textContent = 'Cotizar Enterprise';
        ctaEl.className = 'btn btn--navy btn--lg btn--block pricing-calc__cta';
      } else {
        enterpriseNote.hidden = true;
        priceEl.parentElement.querySelector('.pricing-calc__price-unit').textContent = 'UF/mes';
        ctaEl.textContent = 'Solicitar Demo';
        ctaEl.className = 'btn btn--primary btn--lg btn--block pricing-calc__cta';
      }
      // Update slider track fill
      var pct = ((users - 1) / (300 - 1)) * 100;
      slider.style.background = 'linear-gradient(to right, var(--teal) 0%, var(--teal) ' + pct + '%, var(--surface-border) ' + pct + '%, var(--surface-border) 100%)';
    }

    slider.addEventListener('input', function () { updateCalc(parseInt(this.value, 10)); });
    numberInput.addEventListener('input', function () { updateCalc(parseInt(this.value, 10)); });
    numberInput.addEventListener('blur', function () {
      var v = parseInt(this.value, 10);
      if (isNaN(v) || v < 1) v = 1;
      if (v > 300) v = 300;
      updateCalc(v);
    });
    btnMinus.addEventListener('click', function () { updateCalc(parseInt(numberInput.value, 10) - 1); });
    btnPlus.addEventListener('click', function () { updateCalc(parseInt(numberInput.value, 10) + 1); });

    updateCalc(3);
  }

  // --- Contact form ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // In production, this would POST to an API endpoint.
      // For now, show success message.
      form.style.display = 'none';
      const success = document.querySelector('.form-success');
      if (success) success.classList.add('show');
    });
  }
})();
