// Argento Scientific homepage — nav dropdowns + quote modal.
(() => {
  // Nav dropdowns: hover to open (mouse), click to toggle (keyboard/touch).
  document.querySelectorAll('.nav-item').forEach((item) => {
    const trigger = item.querySelector('.navtrig');
    item.addEventListener('mouseenter', () => item.classList.add('open'));
    item.addEventListener('mouseleave', () => item.classList.remove('open'));
    trigger.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach((o) => o.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.open').forEach((o) => o.classList.remove('open'));
    }
  });

  // Quote modal.
  const scrim = document.getElementById('quote-scrim');
  const sentPanel = document.getElementById('quote-sent');
  const formWrap = document.getElementById('quote-form-wrap');
  const form = document.getElementById('quote-form');

  function showForm() {
    sentPanel.classList.remove('show');
    formWrap.classList.remove('hide');
  }

  function openQuote() {
    showForm();
    form.reset();
    scrim.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuote() {
    scrim.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-quote]').forEach((btn) => {
    btn.addEventListener('click', openQuote);
  });
  document.getElementById('quote-close').addEventListener('click', closeQuote);
  document.getElementById('quote-sent-close').addEventListener('click', closeQuote);
  scrim.addEventListener('click', (e) => {
    if (e.target === scrim) closeQuote();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && scrim.classList.contains('open')) closeQuote();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formWrap.classList.add('hide');
    sentPanel.classList.add('show');
  });
})();
