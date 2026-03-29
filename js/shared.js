document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initRevealAnimations();
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  initCountUp();
});

/* ── HEADER ──────────────────────────────────── */

function renderHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  const navLinks = [
    { href: 'catalog.html', text: 'Продукция' },
    { href: 'dostavka.html', text: 'Доставка' },
    { href: 'price.html', text: 'Прайс' },
    { href: 'o-karere.html', text: 'О карьере' },
    { href: 'kontakty.html', text: 'Контакты' },
  ];

  const mobileLinks = [
    { href: 'index.html', text: 'Главная' },
    ...navLinks,
    { href: 'kalkulyator.html', text: 'Калькулятор' },
    { href: 'optovym-klientam.html', text: 'Оптовикам' },
  ];

  function isActive(href) {
    return currentPage === href ? ' active' : '';
  }

  header.innerHTML = `
    <nav class="nav" role="navigation" aria-label="Основная навигация">
      <div class="container">
        <div class="nav-inner">
          <a href="index.html" class="nav-logo" aria-label="ЕГОРЬЕ — на главную">
            <span>ЕГО</span>РЬЕ
          </a>

          <div class="nav-links">
            ${navLinks.map(l => `<a href="${l.href}" class="nav-link${isActive(l.href)}">${l.text}</a>`).join('')}
          </div>

          <a href="tel:+79850961756" class="nav-phone" aria-label="Позвонить">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +7 (985) 096-17-56
          </a>

          <a href="kalkulyator.html" class="btn btn-primary btn-sm nav-cta">Рассчитать</a>

          <button class="hamburger" aria-label="Меню" aria-expanded="false" aria-controls="mobile-nav">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>

    <div class="nav-mobile" id="mobile-nav" role="dialog" aria-label="Мобильное меню">
      ${mobileLinks.map(l => `<a href="${l.href}">${l.text}</a>`).join('')}
      <a href="tel:+79850961756" class="nav-mobile-phone">+7 (985) 096-17-56</a>
    </div>
  `;
}

/* ── FOOTER ──────────────────────────────────── */

function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="site-footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-brand">
            <div class="footer-brand-name"><em>ЕГО</em>РЬЕ</div>
            <p class="footer-brand-desc">
              Прямые поставки нерудных материалов с собственного карьера. 
              Песок, щебень и галька для строительства, благоустройства и производства.
            </p>
            <a href="tel:+79850961756" class="nav-phone" style="margin-top:auto">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +7 (985) 096-17-56
            </a>
          </div>

          <div class="footer-column">
            <div class="footer-column-title">Продукция</div>
            <div class="footer-links">
              <a href="pesok-seyanyy.html">Песок сеяный</a>
              <a href="pesok-mytyy.html">Песок мытый</a>
              <a href="shcheben-5-20.html">Щебень 5–20</a>
              <a href="galka.html">Галька</a>
              <a href="catalog.html">Весь каталог</a>
            </div>
          </div>

          <div class="footer-column">
            <div class="footer-column-title">Компания</div>
            <div class="footer-links">
              <a href="o-karere.html">О карьере</a>
              <a href="dostavka.html">Доставка</a>
              <a href="price.html">Прайс-лист</a>
              <a href="dokumenty.html">Документы</a>
              <a href="faq.html">Вопросы</a>
              <a href="stati.html">Статьи</a>
            </div>
          </div>

          <div class="footer-column">
            <div class="footer-column-title">Контакты</div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Московская область,<br>Егорьевский район</span>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>info@egorye.ru</span>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Пн–Сб: 8:00–19:00</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ООО «ЕГОРЬЕ». Все права защищены.</span>
          <a href="dokumenty.html">Политика конфиденциальности</a>
        </div>
      </div>
    </div>
  `;
}

/* ── REVEAL ANIMATIONS ───────────────────────── */

function initRevealAnimations() {
  const reveals = document.querySelectorAll('[data-reveal]');
  const staggers = document.querySelectorAll('[data-stagger]');

  if (!reveals.length && !staggers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
  staggers.forEach(el => observer.observe(el));
}

/* ── NAV SCROLL EFFECT ───────────────────────── */

function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const threshold = 60;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > threshold);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ── MOBILE MENU ─────────────────────────────── */

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    mobileNav.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      mobileNav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ── SMOOTH SCROLL ───────────────────────────── */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── COUNT-UP ANIMATION ──────────────────────── */

function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
}

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * ease).toLocaleString('ru-RU') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
