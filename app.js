// Lightweight visual polish + countdown
(() => {
  const canvas = document.getElementById('fx');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w=0,h=0,t=0;
    const dots = Array.from({length: 70}, () => ({
      x: Math.random(), y: Math.random(), vx:(Math.random()-.5)*0.0008, vy:(Math.random()-.5)*0.0008, r: Math.random()*2+0.5
    }));
    const resize = () => { w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w*DPR; canvas.height = h*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); };
    window.addEventListener('resize', resize); resize();
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0,0,w,h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x<0||d.x>1) d.vx*=-1;
        if (d.y<0||d.y>1) d.vy*=-1;
        const x=d.x*w, y=d.y*h;
        ctx.beginPath(); ctx.arc(x,y,d.r,0,Math.PI*2); ctx.fillStyle='rgba(138,180,255,.55)'; ctx.fill();
      }
      for (let i=0;i<dots.length;i++) for (let j=i+1;j<dots.length;j++) {
        const a=dots[i], b=dots[j]; const dx=(a.x-b.x)*w, dy=(a.y-b.y)*h; const dist=Math.hypot(dx,dy);
        if (dist<120) { ctx.strokeStyle=`rgba(91,182,255,${(1-dist/120)*0.2})`; ctx.beginPath(); ctx.moveTo(a.x*w,a.y*h); ctx.lineTo(b.x*w,b.y*h); ctx.stroke(); }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  const target = document.querySelector('[data-countdown]')?.getAttribute('data-countdown');
  const el = document.getElementById('countdown');
  if (target && el) {
    const tick = () => {
      const d = new Date(target).getTime() - Date.now();
      if (d <= 0) { el.textContent = 'Out now'; return; }
      const days = Math.floor(d / 86400000);
      const hrs = Math.floor((d % 86400000) / 3600000);
      const mins = Math.floor((d % 3600000) / 60000);
      el.textContent = `${days}d ${hrs}h ${mins}m`;
    };
    tick(); setInterval(tick, 60000);
  }
})();
