const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowing = false;
let flakes = [];
const DPR = window.devicePixelRatio || 1;

function resizeCanvas() {
  canvas.width = window.innerWidth * DPR;
  canvas.height = window.innerHeight * DPR;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}

function createFlakes() {
  flakes = Array.from({ length: 120 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 1,
    v: Math.random() * 1 + 0.6,
  }));
}

function animateSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (snowing) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    flakes.forEach((flake) => {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
      ctx.fill();

      flake.y += flake.v;
      if (flake.y > window.innerHeight) {
        flake.y = -5;
        flake.x = Math.random() * window.innerWidth;
      }
    });
  }

  requestAnimationFrame(animateSnow);
}

document.getElementById("snowToggle").addEventListener("click", () => {
  snowing = !snowing;
});

resizeCanvas();
createFlakes();
animateSnow();

window.addEventListener("resize", resizeCanvas);
