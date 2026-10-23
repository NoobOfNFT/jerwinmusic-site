// JERWIN site polish: particle field (motion-safe), reveal-on-scroll, mobile nav, footer year
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('yr') && (document.getElementById('yr').textContent = new Date().getFullYear());

  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('navlinks');
  if (toggle && links) toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));

  const canvas = document.getElementById('fx');
  if (canvas && !reduced) {
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, running = true;
    const N = window.innerWidth < 700 ? 36 : 64;
    const dots = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * 0.0007, vy: (Math.random() - .5) * 0.0007, r: Math.random() * 1.8 + 0.5 }));
    const resize = () => { w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * DPR; canvas.height = h * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); };
    window.addEventListener('resize', resize); resize();
    document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) requestAnimationFrame(draw); });
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(138,180,255,.5)'; ctx.fill();
      }
      for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
        const a = dots[i], b = dots[j], dx = (a.x - b.x) * w, dy = (a.y - b.y) * h, dist = Math.hypot(dx, dy);
        if (dist < 120) { ctx.strokeStyle = `rgba(91,182,255,${(1 - dist / 120) * 0.18})`; ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.stroke(); }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }
})();
