const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Icon sizes for PWA
const sizes = [
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' },
];

// Badge sizes
const badgeSizes = [
  { size: 72, name: 'badge-72x72.png' },
  { size: 96, name: 'badge-96x96.png' },
  { size: 128, name: 'badge-128x128.png' },
];

// Specialized icons
const specialIcons = [
  { size: 32, name: 'price-alert.png' },
  { size: 32, name: 'shopping-list.png' },
  { size: 32, name: 'info.png' },
  { size: 32, name: 'success.png' },
  { size: 32, name: 'warning.png' },
  { size: 32, name: 'error.png' },
];

async function generateIcons() {
  const iconsDir = path.join(__dirname, '../public/icons');
  const svgPath = path.join(iconsDir, 'icon.svg');
  
  try {
    // Check if SVG exists
    await fs.access(svgPath);
    
    // Generate main app icons
    console.log('Generating app icons...');
    for (const { size, name } of sizes) {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(path.join(iconsDir, name));
      console.log(`Generated ${name}`);
    }

    // Generate badge icons (simpler version for badges)
    console.log('Generating badge icons...');
    for (const { size, name } of badgeSizes) {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(path.join(iconsDir, name));
      console.log(`Generated ${name}`);
    }

    // Generate favicon
    console.log('Generating favicon...');
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, '../public/favicon.png'));
    
    await sharp(svgPath)
      .resize(16, 16)
      .png()
      .toFile(path.join(iconsDir, 'favicon-16x16.png'));
    
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(iconsDir, 'favicon-32x32.png'));

    // Generate Apple touch icons
    console.log('Generating Apple touch icons...');
    await sharp(svgPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(iconsDir, 'apple-touch-icon.png'));

    await sharp(svgPath)
      .resize(120, 120)
      .png()
      .toFile(path.join(iconsDir, 'apple-touch-icon-120x120.png'));

    // Generate maskable icon (with padding for Android adaptive icons)
    console.log('Generating maskable icon...');
    await sharp(svgPath)
      .resize(416, 416) // Add padding for safe zone
      .extend({
        top: 48,
        bottom: 48,
        left: 48,
        right: 48,
        background: { r: 37, g: 99, b: 235, alpha: 1 } // Match app color
      })
      .resize(512, 512)
      .png()
      .toFile(path.join(iconsDir, 'icon-512x512-maskable.png'));

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// Create simple colored icons for notifications
async function generateNotificationIcons() {
  const iconsDir = path.join(__dirname, '../public/icons');
  
  const colors = {
    'price-alert': '#ef4444', // Red
    'shopping-list': '#10b981', // Green
    'info': '#3b82f6', // Blue
    'success': '#10b981', // Green
    'warning': '#f59e0b', // Yellow
    'error': '#ef4444', // Red
  };

  for (const [name, color] of Object.entries(colors)) {
    const svg = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="${color}"/>
        <text x="16" y="20" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" fill="white">
          ${name === 'price-alert' ? '$' : name === 'shopping-list' ? '🛒' : name === 'success' ? '✓' : name === 'warning' ? '⚠' : name === 'error' ? '✕' : 'i'}
        </text>
      </svg>
    `;
    
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(iconsDir, `${name}.png`));
    
    console.log(`Generated ${name}.png`);
  }
}

// Run the generation
generateIcons().then(() => {
  return generateNotificationIcons();
}).then(() => {
  console.log('Icon generation complete!');
}).catch(console.error);
