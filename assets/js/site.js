(function () {
  'use strict';

  /* ---- Theme toggle ---------------------------------------------------- */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    });
  }

  // Follow the OS only while the visitor has not made an explicit choice.
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onSchemeChange = function (e) {
    try { if (localStorage.getItem('theme')) return; } catch (err) { /* ignore */ }
    root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  };
  if (mq.addEventListener) mq.addEventListener('change', onSchemeChange);
  else if (mq.addListener) mq.addListener(onSchemeChange);

  /* ---- Header hairline once the page scrolls --------------------------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var ticking = false;
    var sync = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(sync); ticking = true; }
    }, { passive: true });
    sync();
  }
})();
