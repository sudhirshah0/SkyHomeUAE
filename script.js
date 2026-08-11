// ===== GUARANTEE PAGE STARTS AT HERO SECTION ON REFRESH =====
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('unload', () => {
  window.scrollTo(0, 0);
});

// Force immediate scroll reset to top hero section on load
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

window.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  // Trigger header navigation entrance animations immediately on page load
  setTimeout(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll('#header [data-animate], .hero [data-animate]').forEach(el => {
      el.classList.add('animated');
    });
  }, 50);
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

// ===== SCROLL ANIMATIONS WITH STAGGER (BIDIRECTIONAL SCROLL UP & DOWN) =====
const animateEls = document.querySelectorAll('[data-animate]');

// Automatically apply sequential staggered transition delays to grid items & lists
document.querySelectorAll(
  '.focus-grid, .listings-grid, .amenities-grid, .news-grid, .areas-grid, .why-uae-cards, .about-features'
).forEach(parent => {
  const children = parent.querySelectorAll('[data-animate]');
  const isAmenities = parent.classList.contains('amenities-grid');
  const delayStep = isAmenities ? 0.08 : 0.12; // Snappy 0.08s step for amenities grid so cards load instantly without long wait
  children.forEach((child, i) => {
    child.style.transitionDelay = `${(i + 1) * delayStep}s`;
  });
});

const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Exclude header & hero elements from reset so they stay visible
    if (entry.target.closest('#header') || entry.target.closest('#home')) return;

    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    } else {
      // Re-trigger animation when scrolling back up out of view
      entry.target.classList.remove('animated');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px 50px 0px' });

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

// ===== VIEW ALL PROPERTIES TOGGLE =====
const viewAllBtn = document.getElementById('view-all-btn');
if (viewAllBtn) {
  viewAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const extraListings = document.querySelectorAll('.extra-listing');
    const isHidden = extraListings[0] && extraListings[0].style.display === 'none';

    extraListings.forEach((card, i) => {
      if (isHidden) {
        card.style.display = 'flex';
        setTimeout(() => card.classList.add('animated'), i * 150);
      } else {
        card.style.display = 'none';
        card.classList.remove('animated');
      }
    });

    viewAllBtn.textContent = isHidden ? 'Show Less Properties' : 'View All UAE Properties';
  });
}

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
