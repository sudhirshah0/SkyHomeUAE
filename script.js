// Force page to start at top hero section on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});
window.addEventListener('DOMContentLoaded', () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});

// ===== NAVBAR SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

function closeMobileMenu() {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
}

hamburger.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent immediate closing on trigger click
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

navLinks.querySelectorAll('.nav-link, .btn').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu when clicking anywhere outside of navbar header
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !header.contains(e.target)) {
    closeMobileMenu();
  }
});

// ===== SEARCH MODAL POPUP LOGIC =====
const searchPillTrigger = document.getElementById('search-pill-trigger');
const searchModalBackdrop = document.getElementById('search-modal-backdrop');
const modalCloseBtn = document.getElementById('modal-close-btn');

function openModal() {
  searchModalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
  searchModalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

if (searchPillTrigger && searchModalBackdrop) {
  searchPillTrigger.addEventListener('click', openModal);
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

// Close when clicking outside modal box
if (searchModalBackdrop) {
  searchModalBackdrop.addEventListener('click', (e) => {
    if (e.target === searchModalBackdrop) {
      closeModal();
    }
  });
}

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchModalBackdrop && searchModalBackdrop.classList.contains('open')) {
    closeModal();
  }
});

// ===== SEARCH TABS (SELECTIVE BUY / RENT / SELL) =====
const searchTabs = document.querySelectorAll('.search-tab');
searchTabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    searchTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ===== SEARCH FORM SUBMIT =====
const searchForm = document.getElementById('search-form');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
    // Scroll to listings
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
const observeSections = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${id}`) item.classList.add('active');
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(sec => observeSections.observe(sec));

// ===== SCROLL ANIMATIONS =====
const animateEls = document.querySelectorAll('[data-animate]');

// Stagger grids
document.querySelectorAll(
  '.focus-grid, .listings-grid, .amenities-grid, .news-grid, .areas-grid, .why-uae-cards'
).forEach(parent => {
  parent.querySelectorAll('[data-animate]').forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.09}s`;
  });
});

const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('animated'), 60);
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
animateEls.forEach(el => animateObserver.observe(el));

// ===== BACK TO TOP =====
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== WISHLIST HEARTS =====
document.querySelectorAll('.wish-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const isWished = btn.textContent === '♥';
    btn.textContent = isWished ? '♡' : '♥';
    btn.style.color = isWished ? '' : '#e8222e';
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.textContent = '✓ Message Sent! We\'ll contact you soon.';
    btn.style.background = '#10b981';
    btn.style.borderColor = '#10b981';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      contactForm.reset();
    }, 4000);
  });
}
