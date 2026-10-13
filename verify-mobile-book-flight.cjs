const puppeteer = require('puppeteer-core');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\rohit\\.gemini\\antigravity\\brain\\a2104a96-d3f5-488f-9d04-3c3329689bb8';

async function verify() {
  console.log('Launching browser to test Book Flight button on iPhone & Samsung screens...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  async function testDevice(name, width, height) {
    console.log(`\nTesting ${name} (${width}x${height})...`);
    await page.setViewport({ width, height, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:5173/?skipPreloader=true', { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1200));

    // 1. Navbar Closed (Check Book Flight in header)
    const closedFile = `${name}_navbar_closed.png`;
    await page.screenshot({ path: path.join(outDir, closedFile), fullPage: false });
    console.log(`Saved ${closedFile}`);

    // 2. Open Mobile Menu (Click hamburger button)
    const menuBtn = await page.$('button[aria-label="Open menu"]');
    if (menuBtn) {
      await menuBtn.click();
      await new Promise((r) => setTimeout(r, 800));
      const openFile = `${name}_menu_opened.png`;
      await page.screenshot({ path: path.join(outDir, openFile), fullPage: false });
      console.log(`Saved ${openFile}`);
    }
  }

  // 1. iPhone 16 Pro Max (440 x 956)
  await testDevice('iphone16_pro_max', 440, 956);

  // 2. Samsung Galaxy standard (360 x 800)
  await testDevice('samsung_galaxy_360', 360, 800);

  // 3. Samsung Galaxy S20 Ultra (412 x 915)
  await testDevice('samsung_galaxy_412', 412, 915);

  await browser.close();
  console.log('Verification complete!');
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
