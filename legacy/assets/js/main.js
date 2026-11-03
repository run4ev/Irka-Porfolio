/* Scales the fixed-size design canvas to the window width (Readymag "scale" mode),
   switches between desktop and phone layouts, and runs the scroll animations. */
(function () {
  var BREAKPOINT = 769; // Readymag switches to the phone layout below this width

  var stage = document.querySelector('.rm-stage');
  var layouts = {
    d: document.querySelector('.rm-layout[data-vp="d"]'),
    m: document.querySelector('.rm-layout[data-vp="m"]')
  };
  var fixeds = {
    d: document.querySelector('.rm-fixed[data-vp="d"]'),
    m: document.querySelector('.rm-fixed[data-vp="m"]')
  };
  var scale = 1;
  var current = null;

  function layout() {
    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;
    var vp = vw < BREAKPOINT && layouts.m ? 'm' : 'd';

    ['d', 'm'].forEach(function (k) {
      if (layouts[k]) layouts[k].classList.toggle('is-active', k === vp);
      if (fixeds[k]) fixeds[k].classList.toggle('is-active', k === vp);
    });

    var L = layouts[vp];
    var w = +L.dataset.w;
    var h = +L.dataset.h;
    scale = vw / w;

    var scaledH = h * scale;
    var top = 0;
    if (stage.dataset.center === '1' && scaledH < vh) top = (vh - scaledH) / 2;

    L.style.transform = 'translate(0,' + top + 'px) scale(' + scale + ')';
    stage.style.height = Math.max(scaledH + top, vh) + 'px';

    var F = fixeds[vp];
    if (F) F.style.transform = 'scale(' + scale + ')';

    current = vp;
    onScroll();
  }

  /* Fixed widgets that slide away on scroll (e.g. the "Projects / Index" bar) */
  function onScroll() {
    var F = fixeds[current];
    if (!F) return;
    var y = window.scrollY / scale;
    F.querySelectorAll('[data-dy]').forEach(function (el) {
      var dy = +el.dataset.dy;
      var speed = +(el.dataset.speed || 1);
      var t = dy < 0 ? Math.max(dy, -y * speed) : Math.min(dy, y * speed);
      el.style.transform = 'translateY(' + t + 'px)';
    });
  }

  /* Fade-in on scroll */
  function initFades() {
    var els = document.querySelectorAll('.anim-fade');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('is-in');
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }

  window.addEventListener('resize', layout);
  window.addEventListener('scroll', onScroll, { passive: true });
  layout();
  initFades();
})();
