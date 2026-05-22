/* =============================================
   BURGER KING - Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---- Mobile menu toggle ---- */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Scroll-reveal animations ---- */
  const animatedEls = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grid children
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedEls.forEach((el, i) => {
    // Auto-assign stagger delay to grid children
    if (!el.dataset.delay) {
      el.dataset.delay = (i % 4) * 100;
    }
    observer.observe(el);
  });

  /* ---- Reservation form ---- */
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    // Set min date to today
    const dateInput = reservationForm.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = reservationForm.querySelector('#res-name').value.trim();
      const guests = reservationForm.querySelector('#res-guests').value;
      const date = reservationForm.querySelector('#res-date').value;
      const time = reservationForm.querySelector('#res-time').value;

      if (name && guests && date && time) {
        showToast(`🎉 Table booked for ${name}! See you on ${formatDate(date)} at ${time}.`, 'success');
        reservationForm.reset();
      }
    });
  }

  /* ---- Contact form ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✅ Message sent! We\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }

  /* ---- Gallery lightbox ---- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      openLightbox(img.src, img.alt);
    });
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Counter animation for stats ---- */
  const statNums = document.querySelectorAll('.stat-item .num');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(num => statsObserver.observe(num));

});

/* ---- Utility: Toast notification ---- */
function showToast(message, type = '') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ---- Utility: Format date ---- */
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/* ---- Utility: Counter animation ---- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent.replace(/\D/g, ''), 10);
  const suffix = el.dataset.suffix || el.textContent.replace(/[0-9]/g, '');
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

/* ---- Utility: Lightbox ---- */
function openLightbox(src, alt) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,0.92);
    display:flex; align-items:center; justify-content:center;
    z-index:9999; cursor:zoom-out; animation:fadeIn 0.3s ease;
  `;

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.style.cssText = `
    max-width:90vw; max-height:90vh; border-radius:12px;
    box-shadow:0 20px 60px rgba(0,0,0,0.8);
    animation:scaleIn 0.3s ease;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes scaleIn { from{transform:scale(0.85)} to{transform:scale(1)} }
  `;
  document.head.appendChild(style);

  overlay.appendChild(img);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  overlay.addEventListener('click', () => {
    document.body.removeChild(overlay);
    document.body.style.overflow = '';
  });
}
