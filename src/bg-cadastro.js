// Fundo animado original para o cadastro
const canvas = document.getElementById('bg-cadastro');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Partículas e formas
const particles = [];
const colors = ['#0fa394', '#17c7b5', '#2A2F31', '#d9d9d9', '#E0E0E0'];

function randomShape() {
  const type = Math.random() > 0.5 ? 'circle' : 'rect';
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
    size: 10 + Math.random() * 30,
    color: colors[Math.floor(Math.random() * colors.length)],
    type,
    alpha: 0.5 + Math.random() * 0.5
  };
}
for (let i = 0; i < 40; i++) particles.push(randomShape());

function draw() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    if (p.type === 'circle') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
    }
    // Movimento
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -50 || p.x > w + 50) p.vx *= -1;
    if (p.y < -50 || p.y > h + 50) p.vy *= -1;
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}
draw();
