/* ============================================
   KULVIO — Main JS
   ============================================ */

(function () {
  'use strict';

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

  // --- Nav scroll effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
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

  // --- Counter animation ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            let current = 0;
            const duration = 1200;
            const step = Math.max(1, Math.ceil(target / (duration / 16)));
            const tick = () => {
              current = Math.min(current + step, target);
              el.textContent = current;
              if (current < target) requestAnimationFrame(tick);
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
    var PRICING_TIERS = [
      { rangeMin: 1,   rangeMax: 3,   includedUsers: 3,  basePriceUF: 5,    extraUserPriceUF: 0,    planName: 'Starter' },
      { rangeMin: 4,   rangeMax: 10,  includedUsers: 3,  basePriceUF: 5,    extraUserPriceUF: 1.0,  planName: 'Growth' },
      { rangeMin: 11,  rangeMax: 25,  includedUsers: 10, basePriceUF: 12,   extraUserPriceUF: 0.8,  planName: 'Scale' },
      { rangeMin: 26,  rangeMax: 50,  includedUsers: 25, basePriceUF: 24,   extraUserPriceUF: 0.6,  planName: 'Business' },
      { rangeMin: 51,  rangeMax: 100, includedUsers: 50, basePriceUF: 39,   extraUserPriceUF: 0.45, planName: 'Business+' },
      { rangeMin: 101, rangeMax: 300, includedUsers: 100, basePriceUF: 61.5, extraUserPriceUF: 0.3,  planName: 'Enterprise' }
    ];

    function calculatePriceByUsers(users) {
      users = Math.max(1, Math.min(300, Math.round(users)));
      var tier = null;
      for (var i = 0; i < PRICING_TIERS.length; i++) {
        if (users >= PRICING_TIERS[i].rangeMin && users <= PRICING_TIERS[i].rangeMax) {
          tier = PRICING_TIERS[i];
          break;
        }
      }
      if (!tier) tier = PRICING_TIERS[PRICING_TIERS.length - 1];
      var extraUsers = Math.max(0, users - tier.includedUsers);
      var totalUF = tier.basePriceUF + (extraUsers * tier.extraUserPriceUF);
      totalUF = Math.round(totalUF * 10) / 10;
      return {
        totalUF: totalUF,
        planName: tier.planName,
        range: tier.rangeMin + '–' + tier.rangeMax,
        pricePerUserUF: Math.round((totalUF / users) * 100) / 100,
        isEnterpriseEstimate: users > 100
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

  // --- Noise texture overlay ---
  var noiseOverlay = document.createElement('div');
  noiseOverlay.setAttribute('aria-hidden', 'true');
  noiseOverlay.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:0.025';
  noiseOverlay.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  document.body.appendChild(noiseOverlay);

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
