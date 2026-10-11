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

    var tapArmed = false;

    // If autoplay is refused outright — iOS Low Power Mode is the usual
    // reason — start the clips on the visitor's first tap instead.
    var armTapFallback = function () {
      if (tapArmed) return;
      tapArmed = true;
      var go = function () {
        onScreen.forEach(function (v) {
          v.muted = true;
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        });
      };
      document.addEventListener('touchstart', go, { once: true, passive: true });
      document.addEventListener('click', go, { once: true });
    };

    var tryPlay = function (v) {
      // Chrome refuses to start muted, video-only media while the page is
      // hidden ("paused to save power"), so wait for it to become visible.
      if (document.hidden) return;
      // Safari does not always honour the muted attribute on its own, and an
      // unmuted play() is blocked without a gesture.
      v.muted = true;
      var p = v.play();
      if (p && p.catch) p.catch(armTapFallback);
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

  /* ---- "Leaving the site" confirmation ---------------------------------- */
  var leaving = document.getElementById('leavingDialog');
  var leavingLinks = document.querySelectorAll('[data-leaving]');

  // Without <dialog> support the links simply behave as ordinary links.
  if (leaving && leavingLinks.length && typeof leaving.showModal === 'function') {
    var pending = null;

    var close = function () { if (leaving.open) leaving.close(); };

    leavingLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        // Let modified clicks (new tab, download, middle click) through.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        pending = a.href;
        var dest = leaving.querySelector('.leaving-dest');
        if (dest) dest.textContent = a.dataset.leaving;
        leaving.showModal();
      });
    });

    leaving.addEventListener('click', function (e) {
      var action = e.target.dataset ? e.target.dataset.leavingAction : null;
      if (!action) {
        // A click on the dialog element itself is a click on the backdrop.
        if (e.target === leaving) close();
        return;
      }
      if (action === 'new' && pending) {
        // Opened straight from the button press, so this is a real user
        // gesture and popup blockers leave it alone.
        window.open(pending, '_blank', 'noopener');
        close();
      } else if (action === 'same' && pending) {
        window.location.href = pending;
      } else {
        close();
      }
    });
  }

  /* ---- Sticky link bar: dim once pinned, publish its height ------------ */
  var linkbar = document.querySelector('.linkbar');

  if (linkbar) {
    var barTop = parseFloat(getComputedStyle(linkbar).top) || 0;

    // Section titles pin just below the bar. Its height changes when the links
    // wrap, so measure it instead of hard-coding an offset. The -1 tucks the
    // title under the bar's hairline so no sliver of content peeks through.
    var measureBar = function () {
      root.style.setProperty('--sticky-offset',
        (Math.round(barTop + linkbar.offsetHeight) - 1) + 'px');
    };

    // One rect read per scroll event, so there's nothing worth batching.
    var syncBar = function () {
      linkbar.classList.toggle('is-stuck',
        linkbar.getBoundingClientRect().top <= barTop + 0.5);
    };

    measureBar();
    syncBar();
    window.addEventListener('resize', measureBar, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(measureBar).observe(linkbar);
    window.addEventListener('scroll', syncBar, { passive: true });
  }

  /* ---- Back to top ------------------------------------------------------ */
  var toTop = document.getElementById('toTop');

  if (toTop) {
    var topTicking = false;

    // Show it only once there is a screenful or so to scroll back past.
    var syncToTop = function () {
      toTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 1.2);
      topTicking = false;
    };

    window.addEventListener('scroll', function () {
      if (!topTicking) { window.requestAnimationFrame(syncToTop); topTicking = true; }
    }, { passive: true });

    toTop.addEventListener('click', function () {
      var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
    });

    syncToTop();
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
