/* =============================================
   BURGER KING - Menu Page JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav ---- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  /* ---- Filter tabs ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const categories = document.querySelectorAll('.menu-category');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      categories.forEach(cat => {
        if (filter === 'all' || cat.dataset.category === filter) {
          cat.style.display = 'block';
          cat.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });

  /* ---- Order buttons ---- */
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.menu-card');
      const name = card.querySelector('h3').textContent;
      showToast(`🍔 ${name} added to your order!`);
      btn.textContent = '✓ Added';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent = 'Order Now';
        btn.style.background = '';
      }, 2000);
    });
  });

  /* ---- Scroll animations ---- */
  const cards = document.querySelectorAll('.menu-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (i % 4) * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

});

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
