/* =============================================================
   Alex Carter — Portfolio
   - Theme toggle (persisted)
   - Mobile nav
   - Active-link scroll spy + navbar shadow
   - Typed hero text
   - Reveal-on-scroll
   - Animated counters
   - Contact form validation + simulated submit
   ============================================================= */

(() => {
  'use strict';

  /* ---------- THEME ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const STORAGE_KEY = 'portfolio-theme';

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.setAttribute('data-theme', savedTheme || (prefersLight ? 'light' : 'dark'));

  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /* ---------- MOBILE NAV ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  };

  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- NAVBAR SHADOW + SCROLL SPY ---------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const linkMap = new Map();
  navLinks?.querySelectorAll('a[href^="#"]').forEach(a => {
    linkMap.set(a.getAttribute('href').slice(1), a);
  });

  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 8);

    const y = window.scrollY + 120;
    let current = '';
    sections.forEach(s => {
      if (s.offsetTop <= y) current = s.id;
    });
    linkMap.forEach((el, id) => el.classList.toggle('active', id === current));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- TYPED HERO ---------- */
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const phrases = [
      'Full-Stack Developer',
      'UI/UX Designer',
      'Open-Source Contributor',
      'Problem Solver',
      'Coffee-Powered Builder',
    ];
    let pi = 0, ci = 0, deleting = false;

    const tick = () => {
      const word = phrases[pi];
      typedEl.textContent = word.slice(0, ci);

      if (!deleting && ci < word.length) {
        ci++;
        setTimeout(tick, 80 + Math.random() * 40);
      } else if (deleting && ci > 0) {
        ci--;
        setTimeout(tick, 35);
      } else {
        deleting = !deleting;
        if (!deleting) pi = (pi + 1) % phrases.length;
        setTimeout(tick, deleting ? 1400 : 300);
      }
    };
    tick();
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const animate = (el) => {
      const end = +el.dataset.count;
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * end) + (end >= 25 ? '+' : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const co = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => co.observe(c));
  }

  /* ---------- CONTACT FORM ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  const validators = {
    name:    (v) => v.trim().length >= 2 || 'Please enter your name (2+ chars).',
    email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
    subject: (v) => v.trim().length >= 3 || 'Subject is too short.',
    message: (v) => v.trim().length >= 10 || 'Message must be at least 10 characters.',
  };

  const validateField = (input) => {
    const label = input.closest('label');
    const err = label?.querySelector('.err');
    const result = validators[input.name]?.(input.value);
    const ok = result === true;
    label?.classList.toggle('invalid', !ok);
    if (err) err.textContent = ok ? '' : result || '';
    return ok;
  };

  form?.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('label')?.classList.contains('invalid')) validateField(input);
    });
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    let allOk = true;
    inputs.forEach(i => { if (!validateField(i)) allOk = false; });
    if (!allOk) {
      status.textContent = 'Please fix the errors above.';
      status.className = 'form-status error';
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    status.textContent = '';
    status.className = 'form-status';

    try {
      // 🔌 Replace this simulated request with a real fetch() to your endpoint.
      // const data = new FormData(form);
      // await fetch('/api/contact', { method: 'POST', body: data });
      await new Promise(res => setTimeout(res, 1200));

      status.textContent = '✅ Thanks! Your message has been sent — I\'ll get back to you soon.';
      status.className = 'form-status success';
      form.reset();
    } catch (err) {
      status.textContent = '❌ Oops, something went wrong. Please try again later.';
      status.className = 'form-status error';
      console.error(err);
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
