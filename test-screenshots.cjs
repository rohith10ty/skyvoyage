const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\rohit\\.gemini\\antigravity\\brain\\a2104a96-d3f5-488f-9d04-3c3329689bb8';

async function run() {
  console.log('Launching Edge for light theme visual verification...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
  });

  // 1. Desktop Test (1440 x 960) - Large desktop monitor
  console.log('Testing Large Desktop Hero View 1440x960...');
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/?skipPreloader=true', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1500));

  await page.screenshot({
    path: path.join(outDir, 'light_desktop_hero.png'),
    fullPage: false
  });
  console.log('Saved light_desktop_hero.png');

  // 1b. Laptop Test (1366 x 680 - typical Windows laptop inner height like 1366x768 or 1080p scaled)
  console.log('Testing Laptop Hero View 1366x680...');
  await page.setViewport({ width: 1366, height: 680, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(outDir, 'light_laptop_hero_700.png'),
    fullPage: false
  });
  console.log('Saved light_laptop_hero_700.png');

  // 2. Scroll down 600px to test sticky navbar and scroll to top button
  console.log('Testing Scroll Down (Sticky Navbar & Scroll-to-Top)...');
  await page.evaluate(() => window.scrollTo(0, 700));
  await new Promise((r) => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(outDir, 'light_desktop_scrolled_sticky.png'),
    fullPage: false
  });
  console.log('Saved light_desktop_scrolled_sticky.png');

  // 3. Full page capture
  console.log('Capturing full page light theme...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 40);
    });
  });
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(outDir, 'light_desktop_full.png'),
    fullPage: true
  });
  console.log('Saved light_desktop_full.png');

  await browser.close();

  console.log('\n--- VERIFICATION SUMMARY ---');
  if (consoleErrors.length === 0) {
    console.log('SUCCESS: ZERO console errors detected in Light Theme!');
  } else {
    console.error('Console errors:', consoleErrors);
  }
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
