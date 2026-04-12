/**
 * Generates OG images (1200x630 PNG) for each page using @resvg/resvg-js
 * Run: node scripts/generate-og.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public");
mkdirSync(outDir, { recursive: true });

function buildSVG({ title, subtitle, unit, accent = "#d4a843", badge }) {
  const lines = splitLines(title, 34);
  const line1 = lines[0] || "";
  const line2 = lines[1] || "";
  const titleY = line2 ? 290 : 315;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1a3e"/>
      <stop offset="100%" stop-color="#0f2044"/>
    </linearGradient>
    <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${accent}cc"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative dots grid -->
  ${Array.from({length: 12}, (_, i) => Array.from({length: 8}, (_, j) =>
    `<circle cx="${80 + i*95}" cy="${60 + j*80}" r="1.5" fill="#ffffff" opacity="0.06"/>`
  ).join("")).join("")}

  <!-- Left gold accent bar -->
  <rect x="0" y="0" width="10" height="630" fill="url(#side)"/>

  <!-- Right decorative panel -->
  <rect x="900" y="0" width="300" height="630" fill="#ffffff" opacity="0.02"/>
  <rect x="910" y="40" width="240" height="3" rx="1.5" fill="${accent}" opacity="0.4"/>
  <rect x="910" y="587" width="240" height="3" rx="1.5" fill="${accent}" opacity="0.4"/>

  <!-- Book icon cluster (right side) -->
  <g transform="translate(1010, 200) rotate(-8)" opacity="0.18">
    <rect x="0" y="0" width="80" height="110" rx="6" fill="#ffffff"/>
    <rect x="0" y="0" width="10" height="110" rx="3" fill="${accent}"/>
    <rect x="15" y="18" width="50" height="6" rx="3" fill="#0f2044"/>
    <rect x="15" y="32" width="40" height="4" rx="2" fill="#0f2044" opacity="0.6"/>
    <rect x="15" y="44" width="45" height="4" rx="2" fill="#0f2044" opacity="0.6"/>
    <rect x="15" y="56" width="35" height="4" rx="2" fill="#0f2044" opacity="0.6"/>
  </g>
  <g transform="translate(1050, 230) rotate(5)" opacity="0.12">
    <rect x="0" y="0" width="70" height="95" rx="5" fill="#ffffff"/>
    <rect x="0" y="0" width="8" height="95" rx="3" fill="${accent}"/>
  </g>

  <!-- Branding top -->
  <text x="52" y="72" font-family="Georgia,serif" font-size="18" font-weight="bold"
        fill="${accent}" letter-spacing="3">STUDY NOTES</text>
  <rect x="52" y="82" width="200" height="1.5" fill="${accent}" opacity="0.4"/>

  <!-- Unit / badge -->
  ${unit ? `<rect x="52" y="104" width="${unit.length * 11 + 28}" height="34" rx="5" fill="${accent}" opacity="0.15"/>
  <rect x="52" y="104" width="4" height="34" rx="2" fill="${accent}"/>
  <text x="68" y="127" font-family="Georgia,serif" font-size="16" fill="${accent}" font-weight="bold">${unit}</text>` : ""}

  <!-- Main title -->
  <text x="52" y="${titleY}" font-family="Georgia,serif" font-size="${line2 ? 62 : 68}"
        font-weight="bold" fill="#f5f0e8" letter-spacing="-0.5">${line1}</text>
  ${line2 ? `<text x="52" y="${titleY + 76}" font-family="Georgia,serif" font-size="62"
        font-weight="bold" fill="#f5f0e8" letter-spacing="-0.5">${line2}</text>` : ""}

  <!-- Subtitle -->
  ${subtitle ? `<text x="52" y="${line2 ? titleY + 140 : titleY + 80}"
        font-family="Arial,sans-serif" font-size="24" fill="#9ab0cc">${subtitle}</text>` : ""}

  <!-- Bottom bar -->
  <rect x="0" y="580" width="1200" height="50" fill="#000000" opacity="0.25"/>
  <text x="52" y="612" font-family="Arial,sans-serif" font-size="16" fill="#9ab0cc">notes.xwolf.space</text>
  <text x="1148" y="612" font-family="Arial,sans-serif" font-size="16" fill="${accent}"
        text-anchor="end">✦</text>
</svg>`;
}

function splitLines(text, maxLen) {
  if (text.length <= maxLen) return [text];
  const words = text.split(" ");
  let line = "";
  const lines = [];
  for (const w of words) {
    if ((line + " " + w).trim().length > maxLen) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 2);
}

const pages = [
  {
    file: "og-home.svg",
    title: "Business Management & Economics",
    subtitle: "Comprehensive interactive study notes",
    unit: "",
    accent: "#d4a843",
  },
  {
    file: "og-bm-topic1.svg",
    title: "Introduction to Management",
    subtitle: "Definition, characteristics, functions, levels & roles",
    unit: "UNIT 1 — BUSINESS MANAGEMENT · TOPIC 1",
    accent: "#d4a843",
  },
  {
    file: "og-eco-week1.svg",
    title: "Introduction to Macroeconomics",
    subtitle: "Basic concepts, scope, and macroeconomic objectives",
    unit: "UNIT 2 — ECONOMICS · WEEK 1",
    accent: "#60a5fa",
  },
  {
    file: "og-eco-week2.svg",
    title: "National Income Analysis",
    subtitle: "GDP, GNP, NNP and three measurement approaches",
    unit: "UNIT 2 — ECONOMICS · WEEK 2",
    accent: "#60a5fa",
  },
  {
    file: "og-eco-week5.svg",
    title: "Classical & Keynesian Theories",
    subtitle: "MPC, APS, multiplier, equilibrium income & 20 examples",
    unit: "UNIT 2 — ECONOMICS · WEEK 5",
    accent: "#60a5fa",
  },
];

for (const page of pages) {
  const svg = buildSVG(page);
  writeFileSync(path.join(outDir, page.file), svg, "utf8");
  console.log(`✓ ${page.file}`);
}

console.log("All OG SVGs written to public/");
