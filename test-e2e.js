import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import gifenc from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = gifenc;

const ARTIFACT_DIR = 'C:\\Users\\Alliah Cassandra\\.gemini\\antigravity-ide\\brain\\52ca9388-d8aa-4492-ac77-e7a7d715d9e4';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const recordedFrames = [];

  async function captureFrame(label = '') {
    console.log(`[Frame] ${label}`);
    const buf = await page.screenshot({ type: 'png' });
    recordedFrames.push(buf);
    return buf;
  }

  async function saveScreenshot(filename, label) {
    console.log(`Saving screenshot: ${filename} (${label})`);
    const filepath = path.join(ARTIFACT_DIR, filename);
    const buf = await page.screenshot({ type: 'png', fullPage: false });
    fs.writeFileSync(filepath, buf);
    recordedFrames.push(buf);
  }

  console.log('1. Navigating to Find Parking (/)');
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  await sleep(1000);
  await saveScreenshot('01_find_parking_page.png', 'Find Parking Home');

  // Test Quick Filters
  console.log('Testing quick filter EV Charging...');
  await page.waitForSelector('#filter-ev');
  await page.click('#filter-ev');
  await sleep(600);
  await captureFrame('Filter: EV Charging');

  console.log('Resetting filter to All Spots...');
  await page.click('#filter-all');
  await sleep(800);
  await captureFrame('Filter: All Spots');

  // Test Floor Plan Modal
  console.log('2. Opening Floor Plan Modal for SM Megamall...');
  await page.waitForSelector('#floor-plan-megamall');
  await page.click('#floor-plan-megamall');
  await sleep(1000);
  await saveScreenshot('02_floorplan_modal.png', 'Floor Plan Modal');

  // Switch levels
  console.log('Switching to Level B2...');
  await page.waitForSelector('#btn-B2');
  await page.click('#btn-B2');
  await sleep(600);
  await captureFrame('Floor Plan: Level B2');

  console.log('Switching back to Level B1 and selecting slot A-10...');
  await page.click('#btn-B1');
  await sleep(600);
  await page.waitForSelector('#slot-A-10');
  await page.click('#slot-A-10');
  await sleep(600);
  await captureFrame('Slot A-10 Selected');

  // Lock and reserve slot
  console.log('Proceeding to checkout...');
  await page.waitForSelector('#proceed-checkout-btn');
  await page.click('#proceed-checkout-btn');
  await sleep(1500);

  // My Bookings Page
  console.log('3. On My Bookings Page (/my-bookings)');
  await saveScreenshot('03_my_bookings_page.png', 'My Bookings Initial');

  // Test add-ons
  console.log('Toggling add-on EV Fast Charge and Car Wash...');
  await page.waitForSelector('#addon-ev');
  await page.click('#addon-ev');
  await sleep(400);
  await page.click('#addon-wash');
  await sleep(500);
  await captureFrame('Add-ons Selected');

  // Test payment method
  console.log('Selecting Maya payment method...');
  await page.waitForSelector('#pay-maya');
  await page.click('#pay-maya');
  await sleep(500);
  await saveScreenshot('04_my_bookings_addons_maya.png', 'My Bookings Add-ons & Maya');

  // Mall Manager Portal
  console.log('4. Navigating to Mall Manager Portal (/mall-manager)...');
  await page.waitForSelector('#nav-mall-manager');
  await page.click('#nav-mall-manager');
  await sleep(1200);
  await saveScreenshot('05_mall_manager_page.png', 'Mall Manager Overview');

  // Toggle Space Controls
  console.log('Toggling Peak Hours Surge and Maintenance Lock...');
  await page.waitForSelector('#peak-toggle');
  await page.click('#peak-toggle');
  await sleep(500);
  await page.click('#maint-toggle');
  await sleep(600);
  await captureFrame('Space Controls Toggled');

  // Test session search filter
  console.log('Searching for Civic in live sessions...');
  const searchInput = await page.$('input[placeholder="Search plate or user..."]');
  if (searchInput) {
    await searchInput.type('Civic');
    await sleep(600);
    await saveScreenshot('06_mall_manager_filtered.png', 'Mall Manager Filtered Session');
  }

  // System Analytics Page
  console.log('5. Navigating to System Analytics (/analytics)...');
  await page.waitForSelector('#nav-analytics');
  await page.click('#nav-analytics');
  await sleep(1200);
  await saveScreenshot('07_system_analytics_page.png', 'System Analytics Overview');

  // Test 7D / 30D / 24H chart toggles
  console.log('Toggling 7D chart...');
  const btn7D = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.textContent.trim() === '7D');
  });
  if (btn7D) {
    await btn7D.click();
    await sleep(600);
    await captureFrame('Analytics: 7D Chart');
  }

  // User Profile Page
  console.log('6. Navigating to User Profile (/account)...');
  await page.waitForSelector('#nav-account');
  await page.click('#nav-account');
  await sleep(1200);
  await saveScreenshot('08_user_profile_page.png', 'User Profile General');

  // Test Tabs in Profile
  console.log('Clicking Saved Vehicles Tab...');
  await page.waitForSelector('#tab-btn-vehicles');
  await page.click('#tab-btn-vehicles');
  await sleep(600);
  await saveScreenshot('09_saved_vehicles_tab.png', 'Saved Vehicles Tab');

  console.log('Clicking Payment Methods Tab...');
  await page.waitForSelector('#tab-btn-payments');
  await page.click('#tab-btn-payments');
  await sleep(600);
  await saveScreenshot('10_payment_methods_tab.png', 'Payment Methods Tab');

  console.log('Clicking Parking Stats & History Tab...');
  await page.waitForSelector('#tab-btn-stats');
  await page.click('#tab-btn-stats');
  await sleep(600);
  await saveScreenshot('11_parking_stats_tab.png', 'Parking Stats Tab');

  await browser.close();
  console.log(`Finished capturing ${recordedFrames.length} frames.`);

  // Generate Animated GIF screen recording from captured frames
  console.log('Encoding frames into animated GIF screen recording...');
  const gifPath = path.join(ARTIFACT_DIR, 'sanpark_screen_recording.gif');
  
  const targetW = 720;
  const targetH = 450;
  const gif = GIFEncoder();

  for (let i = 0; i < recordedFrames.length; i++) {
    const png = PNG.sync.read(recordedFrames[i]);
    
    const scaledRgba = new Uint8Array(targetW * targetH * 4);
    const scaleX = png.width / targetW;
    const scaleY = png.height / targetH;

    for (let y = 0; y < targetH; y++) {
      for (let x = 0; x < targetW; x++) {
        const srcX = Math.floor(x * scaleX);
        const srcY = Math.floor(y * scaleY);
        const srcIdx = (srcY * png.width + srcX) * 4;
        const dstIdx = (y * targetW + x) * 4;

        scaledRgba[dstIdx] = png.data[srcIdx];
        scaledRgba[dstIdx + 1] = png.data[srcIdx + 1];
        scaledRgba[dstIdx + 2] = png.data[srcIdx + 2];
        scaledRgba[dstIdx + 3] = png.data[srcIdx + 3];
      }
    }

    const palette = quantize(scaledRgba, 256);
    const index = applyPalette(scaledRgba, palette);

    gif.writeFrame(index, targetW, targetH, {
      palette,
      delay: 1000,
      repeat: 0
    });
  }

  gif.finish();
  fs.writeFileSync(gifPath, Buffer.from(gif.bytes()));
  console.log('Successfully generated animated screen recording at:', gifPath);
}

run().catch(err => {
  console.error('Error running test script:', err);
  process.exit(1);
});
