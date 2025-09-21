"use strict";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const TIME_SCALE = 0.2;
const MIN_STEP = 20;

const SIN_RES = 8192;
const sinTable = new Float32Array(SIN_RES);

for (let i = 0; i < SIN_RES; i++) {
  sinTable[i] = Math.sin((i / SIN_RES) * 2 * Math.PI);
}

function fastSin(theta) {
  const index = Math.floor((theta / (2 * Math.PI)) * SIN_RES) % SIN_RES;
  return sinTable[index < 0 ? index + SIN_RES : index];
}

function fastCos(theta) {
  return fastSin(theta + Math.PI / 2);
}

function sinCos(theta) {
  return [fastSin(theta), fastCos(theta)];
}

const draw = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  ctx.canvas.width = w;
  ctx.canvas.height = h;

  const KX = Math.max(w, h);
  const STEP = Math.max(MIN_STEP, 50);
  const time = (TIME_SCALE * Date.now()) / 1000;

  ctx.strokeStyle = "rgba(212, 174, 47, 1)";
  ctx.lineWidth = 1;

  ctx.beginPath();

  let nt = time * 0.1;
  let [nc, ns] = sinCos(nt);

  for (let by = -KX; by <= KX; by += STEP) {
    for (let bx = -KX; bx <= KX; bx += STEP) {
      const dx = bx + w / 2;
      const dy = by + h / 2;
      const d = Math.sqrt(dx * dx + dy * dy) / (0.002 * KX);

      const st = time - d / 100;
      let [s, sp] = sinCos(st);
      s *= 0.2;
      sp *= 0.2;

      const x = bx + (bx - 1.5 * by) * s;
      const y = by + (by - bx) * s;

      let nx = x * nc + y * ns;
      let ny = x * ns - y * nc;

      const rx = nx + w / 2;
      const ry = ny + h / 2;

      const vx =
        (bx - 1.5 * by) * sp * nc +
        (by - bx) * sp * ns -
        0.1 * x * ns +
        0.1 * y * nc;

      const vy =
        (bx - 1.5 * by) * sp * ns -
        (by - bx) * sp * nc +
        0.1 * x * nc +
        0.1 * y * ns;

      if (rx < -10 || rx > w + 10) continue;
      if (ry < -10 || ry > h + 10) continue;

      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + vx / 10, ry + vy / 10);
    }
  }
  ctx.stroke();
};

const loop = () => {
  draw();
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
