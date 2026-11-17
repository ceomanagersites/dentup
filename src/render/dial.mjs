// Циферблат суток: полукруг от 00:00 (левый край горизонта) через полдень (зенит) до 24:00 (правый край).
// Текущее время Ташкента — «солнце», которое идёт по дуге. Скрипт двигает его, без скрипта циферблат статичен.
import { esc } from "./typo.mjs";

const CX = 500;
const CY = 500;
const R = 440;
const round = (n) => Math.round(n * 10) / 10;
const at = (hour, r) => {
  const a = Math.PI - (hour / 24) * Math.PI;
  return [round(CX + r * Math.cos(a)), round(CY - r * Math.sin(a))];
};

export function renderDial(t) {
  const ticks = [];
  for (let i = 0; i <= 48; i++) {
    const hour = i / 2;
    const major = i % 12 === 0;
    const len = major ? 34 : i % 2 === 0 ? 18 : 8;
    const [x1, y1] = at(hour, R);
    const [x2, y2] = at(hour, R - len);
    ticks.push(
      `<line class="dial-tick${major ? " is-major" : i % 2 ? " is-half" : ""}" style="--i:${i}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`
    );
  }
  const nums = [0, 6, 12, 18, 24]
    .map((h) => {
      const [x, y] = at(h, R - 78);
      const anchor = h === 0 ? "start" : h === 24 ? "end" : "middle";
      const dy = h === 12 ? 12 : h === 0 || h === 24 ? -10 : 6;
      return `<text class="dial-num" x="${h === 0 ? x - 20 : h === 24 ? x + 20 : x}" y="${y + dy}" text-anchor="${anchor}">${String(h).padStart(2, "0")}</text>`;
    })
    .join("");
  // Части суток подписаны снаружи дуги: ночь 0–6, утро 6–12, день 12–18, вечер 18–24.
  const parts = [3, 9, 15, 21]
    .map((h, i) => {
      const [x, y] = at(h, R + 34);
      return `<text class="dial-part" x="${x}" y="${y}" text-anchor="middle">${esc(t.parts[i])}</text>`;
    })
    .join("");

  return `<div class="dial" role="img" aria-label="${esc(t.dialLabel)}">
  <svg class="dial-svg" viewBox="0 0 1000 520" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
    <path class="dial-track" d="M60 500A440 440 0 0 1 940 500" pathLength="1"/>
    <path class="dial-progress" d="M60 500A440 440 0 0 1 940 500" pathLength="1"/>
    <g class="dial-ticks">${ticks.join("")}</g>
    ${nums}
    ${parts}
    <g class="dial-sun">
      <circle class="dial-halo" cx="${CX - R}" cy="${CY}" r="30"/>
      <circle class="dial-core" cx="${CX - R}" cy="${CY}" r="11"/>
    </g>
    <line class="dial-horizon" x1="0" y1="${CY}" x2="1000" y2="${CY}"/>
  </svg>
  <div class="dial-readout">
    <p class="dial-caption" data-clock-caption hidden>${esc(t.clockCaption)}</p>
    <p class="dial-time"><span data-clock>${esc(t.clockStatic)}</span></p>
    <p class="dial-status"><span class="dial-dot" aria-hidden="true"></span><span data-clock-status data-live="${esc(t.status)}">${esc(t.statusStatic)}</span></p>
  </div>
</div>`;
}
