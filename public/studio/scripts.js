// Mobile menu toggle
const burger = document.querySelector('[data-burger]');
const panel = document.querySelector('[data-mobile-panel]');
if (burger && panel) {
  burger.addEventListener('click', () => {
    panel.classList.toggle('open');
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
  });
}

// Smooth close on link click (mobile)
document.querySelectorAll('[data-mobile-link]').forEach(a => {
  a.addEventListener('click', () => panel && panel.classList.remove('open'));
});

// Intersection Observer for reveal animations
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Portfolio filtering
const filterButtons = document.querySelectorAll('[data-filter]');
const tiles = document.querySelectorAll('[data-cat]');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tiles.forEach(t => {
      const show = cat === 'all' || t.dataset.cat === cat;
      t.style.display = show ? '' : 'none';
    });
  });
});

// Form validation and fake submit
const form = document.querySelector('#contact-form');
const modal = document.querySelector('[data-modal]');
const closeModal = document.querySelector('[data-close-modal]');

function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg || '';
}

if (closeModal && modal) {
  closeModal.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    const consent = form.querySelector('[name="consent"]').checked;

    let valid = true;
    setError('err-name');
    setError('err-email');
    setError('err-message');

    if (name.length < 2) { setError('err-name', 'Please enter your name.'); valid = false; }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) { setError('err-email', 'Enter a valid email address.'); valid = false; }
    if (message.length < 10) { setError('err-message', 'Message should be at least 10 characters.'); valid = false; }
    if (!consent) { alert('Please agree to the privacy policy.'); valid = false; }

    if (!valid) return;

    // Simulate async submit
    const btn = form.querySelector('button[type="submit"]');
    const prev = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = prev;
      form.reset();
      if (modal) modal.classList.add('open');
    }, 900);
  });
}
