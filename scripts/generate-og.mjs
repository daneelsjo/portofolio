import sharp from 'sharp';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#020617"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#10b981"/>
      <stop offset="100%" style="stop-color:#06b6d4"/>
    </linearGradient>
    <radialGradient id="orb1" cx="80%" cy="20%" r="50%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.25"/>
      <stop offset="100%" style="stop-color:#10b981;stop-opacity:0"/>
    </radialGradient>
    <radialGradient id="orb2" cx="15%" cy="85%" r="45%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.2"/>
      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#orb1)"/>
  <rect width="${W}" height="${H}" fill="url(#orb2)"/>

  <!-- Dot grid -->
  <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)"/>
  </pattern>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- Glass card -->
  <rect x="60" y="60" width="${W - 120}" height="${H - 120}" rx="24"
    fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- Accent bar top -->
  <rect x="60" y="60" width="${W - 120}" height="3" rx="2" fill="url(#accent)"/>

  <!-- Initials badge -->
  <circle cx="130" cy="190" r="48" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.3)" stroke-width="1.5"/>
  <text x="130" y="200" text-anchor="middle" dominant-baseline="middle"
    font-family="system-ui, -apple-system, sans-serif" font-weight="800"
    font-size="28" fill="url(#accent)">JD</text>

  <!-- Name -->
  <text x="200" y="170" font-family="system-ui, -apple-system, sans-serif"
    font-weight="800" font-size="64" fill="white">Jonathan</text>
  <text x="200" y="240" font-family="system-ui, -apple-system, sans-serif"
    font-weight="800" font-size="64" fill="url(#accent)">Daneels</text>

  <!-- Subtitle -->
  <text x="200" y="295" font-family="system-ui, -apple-system, sans-serif"
    font-weight="400" font-size="24" fill="rgba(148,163,184,1)">
    Full-stack Webdeveloper · SaaS Architect
  </text>

  <!-- Divider -->
  <line x1="100" y1="360" x2="${W - 100}" y2="360"
    stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- Tags -->
  ${['Next.js', 'Firebase', 'Tailwind CSS', 'TypeScript', 'Node.js'].map((tag, i) => {
    const x = 100 + i * 190;
    return `
    <rect x="${x}" y="385" width="172" height="36" rx="18"
      fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="${x + 86}" y="403" text-anchor="middle" dominant-baseline="middle"
      font-family="system-ui, -apple-system, sans-serif"
      font-size="14" fill="rgba(148,163,184,1)">${tag}</text>`;
  }).join('')}

  <!-- URL -->
  <text x="${W - 100}" y="${H - 80}" text-anchor="end"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="16" fill="rgba(71,85,105,1)">portfolio-daneelsjo.web.app</text>
</svg>`;

try {
  if (!existsSync('public')) mkdirSync('public');
  await sharp(Buffer.from(svg)).png({ quality: 95 }).toFile('public/og-image.png');
  console.log('✓ og-image.png generated (1200×630)');
} catch (e) {
  console.warn('⚠ Could not generate og-image.png:', e.message);
}
