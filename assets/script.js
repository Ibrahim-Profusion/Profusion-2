// ProFusion — light interactions
(function () {
  'use strict';

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Highlight current nav link
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('is-current');
  });

  // Contact form — client-side confirmation (no backend)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var status = document.getElementById('formStatus');
      var name  = (document.getElementById('name')  || {}).value;
      var email = (document.getElementById('email') || {}).value;
      if (!name || !email) {
        status.textContent = 'Please add your name and email so we can get back to you.';
        status.style.color = 'var(--accent)';
        return;
      }
      status.textContent = 'Thanks — Celia will call you back within one business day.';
      status.style.color = 'var(--brand)';
      form.reset();
    });
  }
})();
