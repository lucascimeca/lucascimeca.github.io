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

  /* ---- Looping clips: play only while on screen ------------------------ */
  // Covers both the figures inside a post and the thumbnails on the index.
  var clips = document.querySelectorAll('.clip video, .card-media video');
  if (clips.length) {
    var onScreen = [];

    var tryPlay = function (v) {
      // Chrome refuses to start muted, video-only media while the page is
      // hidden ("paused to save power"), so wait for it to become visible.
      if (document.hidden) return;
      var p = v.play();
      if (p && p.catch) p.catch(function () { /* blocked; poster stays up */ });
    };

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var v = e.target;
          var i = onScreen.indexOf(v);
          if (e.isIntersecting) {
            if (i === -1) onScreen.push(v);
            tryPlay(v);
          } else {
            if (i !== -1) onScreen.splice(i, 1);
            if (!v.paused) v.pause();
          }
        });
      }, { rootMargin: '200px 0px', threshold: 0.01 });

      for (var i = 0; i < clips.length; i++) io.observe(clips[i]);

      // Retry whatever is on screen once the tab comes back to the foreground.
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) return;
        onScreen.forEach(tryPlay);
      });
    } else {
      for (var j = 0; j < clips.length; j++) tryPlay(clips[j]);
    }
  }

  /* ---- Masthead fade + header hairline on scroll ------------------------ */
  var header = document.getElementById('siteHeader');
  var masthead = document.getElementById('masthead');

  if (header || masthead) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ticking = false;

    var sync = function () {
      var y = window.scrollY;

      if (header) header.classList.toggle('is-stuck', y > 8);

      if (masthead) {
        // Fade out over the masthead's own height, so it is gone by the time
        // it has scrolled past rather than at some arbitrary pixel offset.
        var h = masthead.offsetHeight || 1;
        var p = Math.min(1, y / (h * 0.8));
        masthead.style.opacity = String(1 - p);
        if (!reduce) masthead.style.transform = 'translateY(' + (-p * 12).toFixed(1) + 'px)';
        // Stop it swallowing clicks once invisible
        masthead.style.visibility = p >= 1 ? 'hidden' : '';
      }

      ticking = false;
    };

    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(sync); ticking = true; }
    }, { passive: true });
    sync();
  }
})();
