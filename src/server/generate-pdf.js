import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://localhost:5173/resume/?pdfPrint=true';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'resume.pdf', format: 'A4' });
  await browser.close();
})();

