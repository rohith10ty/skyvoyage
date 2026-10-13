const puppeteer = require('puppeteer-core');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\rohit\\.gemini\\antigravity\\brain\\a2104a96-d3f5-488f-9d04-3c3329689bb8';

async function test() {
  console.log('Testing Airport dropdown and Indian airport search...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/?skipPreloader=true', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  // Scroll to booking widget
  await page.evaluate(() => {
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 600));

  // 1. Click Departure City to open dropdown
  console.log('Opening Departure City dropdown...');
  const originBtn = await page.$('#origin-airport');
  if (originBtn) {
    await originBtn.click();
    await new Promise((r) => setTimeout(r, 500));

    // Capture open dropdown (All / India / Global tabs visible)
    await page.screenshot({ path: path.join(outDir, 'airport_dropdown_open.png'), fullPage: false });
    console.log('Saved airport_dropdown_open.png');

    // 2. Type "hyd" in search box
    console.log('Searching for "hyd"...');
    const searchInput = await page.$('input[placeholder*="Search"]');
    if (searchInput) {
      await searchInput.type('hyd');
      await new Promise((r) => setTimeout(r, 400));

      await page.screenshot({ path: path.join(outDir, 'airport_search_hyd.png'), fullPage: false });
      console.log('Saved airport_search_hyd.png');

      // 3. Clear and click India tab
      await searchInput.click({ clickCount: 3 });
      await page.keyboard.press('Backspace');
      await new Promise((r) => setTimeout(r, 300));

      // Click India tab
      const indiaTab = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find((b) => b.textContent.includes('India'));
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      });
      console.log('Clicked India tab:', indiaTab);
      await new Promise((r) => setTimeout(r, 400));

      await page.screenshot({ path: path.join(outDir, 'airport_tab_india.png'), fullPage: false });
      console.log('Saved airport_tab_india.png');
    }
  }

  await browser.close();
  console.log('Airport dropdown test complete!');
}

test().catch((err) => {
  console.error(err);
  process.exit(1);
});
