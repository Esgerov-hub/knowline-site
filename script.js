const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-nav]');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll('[data-accordion] .faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const plus = item.querySelector('.faq-plus');
    const willOpen = button.getAttribute('aria-expanded') !== 'true';

    document.querySelectorAll('[data-accordion] .faq-item button').forEach((otherButton) => {
      const otherItem = otherButton.closest('.faq-item');
      otherButton.setAttribute('aria-expanded', 'false');
      otherItem.querySelector('.faq-answer').hidden = true;
      otherItem.querySelector('.faq-plus').textContent = '+';
    });

    button.setAttribute('aria-expanded', String(willOpen));
    answer.hidden = !willOpen;
    plus.textContent = willOpen ? '−' : '+';
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const header = document.querySelector('[data-header]');
if (header) {
  const setHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });
}

