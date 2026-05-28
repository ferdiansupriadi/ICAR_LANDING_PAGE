// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  window.scrollY > 100 ? navbar.classList.add('nav-scrolled') : navbar.classList.remove('nav-scrolled');
});

// === MOBILE MENU ===
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
});
closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
});
document.addEventListener('click', e => {
  if (!mobileMenu.classList.contains('active')) return;
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    mobileMenuBtn.focus();
  }
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}));

// === BATTERY TOGGLE === (removed - each variant now has fixed battery type)
// === HERO CAROUSEL (mobile) ===
(function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  if (!slides.length) return;
  let current = 0;
  function goTo(idx) {
    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    slides[idx].classList.add('active');
    if (indicators[idx]) indicators[idx].classList.add('active');
  }
  setInterval(() => { current = (current + 1) % slides.length; goTo(current); }, 4000);
  indicators.forEach((ind, i) => ind.addEventListener('click', () => { current = i; goTo(i); }));

  // Swipe support
  let touchStart = 0;
  const carousel = document.getElementById('mobile-carousel');
  if (carousel) {
    carousel.addEventListener('touchstart', e => { touchStart = e.changedTouches[0].screenX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const diff = touchStart - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) { current = diff > 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length; goTo(current); }
    }, { passive: true });
  }
})();

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.remove('fade-in-pending');
      e.target.classList.add('fade-in-visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
document.querySelectorAll('.fade-in-pending').forEach(el => revealObserver.observe(el));

// === BACK TO TOP ===
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 400));
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// === CONTACT FORM ===
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const variant = document.getElementById('variant').value;
    const message = document.getElementById('message').value.trim();
    if (!name || !phone) { alert('Mohon isi nama dan nomor WhatsApp Anda.'); return; }
    const text = encodeURIComponent(
      'Halo icar, saya ingin konsultasi.\n\n' +
      'Nama: ' + name + '\nTelepon: ' + phone +
      '\nVarian: ' + (variant || 'Belum dipilih') +
      '\n\nPesan: ' + (message || '-')
    );
    window.open('https://wa.me/6281319212874?text=' + text, '_blank');
    contactForm.reset();
  });
}