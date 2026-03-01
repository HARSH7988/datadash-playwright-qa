const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [19,20,21,22,23,24,25,26,27,28];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // Wait for table to load
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => td.innerText.trim())
        .filter(text => !isNaN(text))
        .map(Number)
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum:`, sum);

    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
