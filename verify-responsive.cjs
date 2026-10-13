const puppeteer = require('puppeteer-core');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\rohit\\.gemini\\antigravity\\brain\\a2104a96-d3f5-488f-9d04-3c3329689bb8';

async function verify() {
  console.log('Launching browser to test responsive layouts and plane rendering...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Helper to test a viewport with full animation completion
  async function testViewport(name, width, height, isMobile = false) {
    console.log(`Testing ${name} (${width} x ${height})...`);
    await page.setViewport({ width, height, deviceScaleFactor: isMobile ? 2 : 1, isMobile, hasTouch: isMobile });
    await page.goto('http://localhost:5173/?skipPreloader=true', { waitUntil: 'networkidle2' });
    // Wait for all hero animations to fully complete (1.8s)
    await new Promise((r) => setTimeout(r, 1800));
    const filename = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${width}x${height}.png`;
    await page.screenshot({ path: path.join(outDir, filename), fullPage: false });
    console.log(`Saved ${filename}`);
  }

  // 1. Mobile: iPhone 16 Pro Max
  await testViewport('iphone16_pro_max', 440, 956, true);

  // 2. Mobile: iPhone 14/15 Pro
  await testViewport('iphone14_pro', 390, 844, true);

  // 3. Laptop: 1366 x 680 (compact laptop display)
  await testViewport('laptop_compact', 1366, 680, false);

  // 4. Laptop: 1280 x 800
  await testViewport('laptop_1280', 1280, 800, false);

  // 5. Desktop: 1440 x 900
  await testViewport('desktop_1440', 1440, 900, false);

  await browser.close();
  console.log('All verification screenshots saved successfully!');
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
