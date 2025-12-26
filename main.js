const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowing = true;
let flakes = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function initSnow() {
  flakes = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    v: Math.random() * 0.8 + 0.4,
  }));
}

function animateSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (snowing) {
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    flakes.forEach((f) => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();

      f.y += f.v;
      if (f.y > canvas.height) {
        f.y = -5;
        f.x = Math.random() * canvas.width;
      }
    });
  }

  requestAnimationFrame(animateSnow);
}

document.getElementById("snowToggle").addEventListener("click", () => {
  snowing = !snowing;
});

initSnow();
animateSnow();
