// ── Dynamic year ────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll effect ─────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightNav();
}, { passive: true });

// ── Mobile menu ──────────────────────────────────────────────────
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.querySelector('i').className = navLinks.classList.contains('active')
        ? 'fas fa-times' : 'fas fa-bars';
});
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

// ── Active nav link on scroll ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
function highlightNav() {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 220) current = s.id;
    });
    navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

// ── Scroll Reveal ─────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const ioReveal = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
    { threshold: 0.12 }
);
revealEls.forEach(el => ioReveal.observe(el));

// ── Animated number counters ──────────────────────────────────────
function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(timer);
    }, 16);
}

const ioCounter = new IntersectionObserver(
    (entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                ioCounter.unobserve(e.target);
            }
        });
    },
    { threshold: 0.5 }
);
document.querySelectorAll('.astat-n[data-count]').forEach(el => ioCounter.observe(el));

// ── SVG Skill Rings ───────────────────────────────────────────────
const CIRCUMFERENCE = 2 * Math.PI * 42; // r=42

function animateRing(ringEl) {
    const pct = parseInt(ringEl.dataset.pct, 10);
    const fill = ringEl.querySelector('.sr-fill');
    const dash = (pct / 100) * CIRCUMFERENCE;
    fill.style.strokeDasharray = `${dash} ${CIRCUMFERENCE}`;
}

const ioRing = new IntersectionObserver(
    (entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                // small delay for stagger
                setTimeout(() => animateRing(e.target), 150);
                ioRing.unobserve(e.target);
            }
        });
    },
    { threshold: 0.5 }
);
document.querySelectorAll('.sring').forEach(el => {
    // Start at 0
    const fill = el.querySelector('.sr-fill');
    fill.style.strokeDasharray = `0 ${CIRCUMFERENCE}`;
    ioRing.observe(el);
});
