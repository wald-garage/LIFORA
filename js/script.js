/* ============================================
   LIFORA — JavaScript (Dark Edition)
   ============================================ */

// ── Mobile menu ──
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const bars = hamburger.querySelectorAll('span');
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(b => {
        b.style.transform = ''; b.style.opacity = '';
      });
    });
  });
}

// ── Active nav link ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href') || '';
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── Scroll fade-in ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 5) * 70}ms`;
  observer.observe(el);
});

// ── WhatsApp redirect ──
function beli(namaProduk) {
  const text = `Halo, saya tertarik dengan produk ${namaProduk} Lifora`;
  const url = `https://wa.me/62895422207929?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// ── 3D Tilt on card-3d ──
document.querySelectorAll('.card-3d').forEach(card => {
  const isProduct = card.classList.contains('product-card');

  // Add shimmer overlay to product cards
  if (isProduct) {
    const hl = document.createElement('div');
    hl.className = 'card-highlight-overlay';
    hl.style.cssText = 'position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:1;';
    card.insertBefore(hl, card.firstChild);
  }

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top)  / rect.height - .5;
    const maxTilt = isProduct ? 18 : 10;
    const rotX = -y * maxTilt;
    const rotY =  x * maxTilt;
    card.style.transition = 'transform .05s linear, box-shadow .05s linear';
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${isProduct ? 24 : 8}px)`;
    if (isProduct) {
      const gx = ((x + .5) * 100).toFixed(1);
      const gy = ((y + .5) * 100).toFixed(1);
      const glow = (.18 + (Math.abs(x) + Math.abs(y)) * .1).toFixed(3);
      const sx = (-x * 24).toFixed(1);
      const sy = (-y * 24).toFixed(1);
      card.style.boxShadow = `${sx}px ${sy}px 60px rgba(0,0,0,.6), 0 0 40px rgba(34,197,94,${glow}), 0 0 0 1px rgba(34,197,94,.35), inset 0 1px 0 rgba(255,255,255,.06)`;
      card.style.borderColor = 'rgba(34,197,94,.4)';
      const ov = card.querySelector('.card-highlight-overlay');
      if (ov) ov.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(34,197,94,.18) 0%, rgba(34,197,94,.04) 40%, transparent 65%)`;
    } else {
      card.style.boxShadow = `${-x*10}px ${-y*10}px 40px rgba(0,0,0,.4), 0 0 30px rgba(34,197,94,.2)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .5s cubic-bezier(.23,1,.32,1), box-shadow .5s ease, border-color .3s';
    card.style.transform = '';
    card.style.boxShadow = '';
    card.style.borderColor = '';
    const ov = card.querySelector('.card-highlight-overlay');
    if (ov) ov.style.background = '';
  });
});

// ── Navbar scroll style ──
const navbar = document.querySelector('.navbar');
if (navbar) {
  addEventListener('scroll', () => {
    if (scrollY > 10) {
      navbar.style.boxShadow = '0 2px 32px rgba(0,0,0,.4)';
      navbar.style.borderBottomColor = 'rgba(34,197,94,.20)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.borderBottomColor = '';
    }
  }, { passive: true });
}

// ── Contact form ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = '✓ Pesan terkirim!';
    btn.style.background = '#15803d';
    setTimeout(() => {
      btn.textContent = 'Kirim Pesan →';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ── Counter animation ──
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('[data-count]');
if (statNums.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = +e.target.dataset.count;
        const suffix = e.target.dataset.suffix || '';
        animateCounter(e.target, target, suffix);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(n => io.observe(n));
}

// ── Hero health card interactive tilt ──
const heroCard = document.querySelector('.hero-health-card');
if (heroCard) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroCard.style.transform = `perspective(800px) rotateY(${-8 + dx * 6}deg) rotateX(${3 - dy * 4}deg)`;
  });
}

// ── Loading Screen ──
(function() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  // Hide after bar animation completes (~1.7s) + tiny buffer
  setTimeout(() => {
    screen.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(() => screen.remove(), 700);
  }, 1900);
})();

// ── Hero Typewriter Loop ──
(function() {
  const el = document.getElementById('heroTyped');
  if (!el) return;

  const words = ['Health', 'Smart', 'Future', 'Hidup', 'Anda'];
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const PAUSE_END   = 1800;  // ms after full word
  const PAUSE_START = 400;   // ms after fully deleted
  const SPEED_TYPE  = 90;
  const SPEED_DEL   = 50;

  function tick() {
    const word = words[wordIdx];
    if (!deleting) {
      charIdx++;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
    } else {
      charIdx--;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
    }
    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }

  // Start after loading screen hides
  setTimeout(tick, 2100);
})();
