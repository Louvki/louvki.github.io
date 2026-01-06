import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";
import { compress } from 'compress-pdf';

import path from 'path';
import fs from "fs";

const baseUrl = "http://localhost:5173/#/resume?pdfPrint=true"; // Default to localhost

async function compressPDF(inputPath) {
  console.log(`🗜️  Compressing PDF: ${inputPath}`);

  // DO
  const pdf = path.resolve(inputPath);
  const buffer = await compress(pdf);

  const compressedPdf = path.resolve(inputPath);
  await fs.promises.writeFile(compressedPdf, buffer);


  // console.log(`✅ Compressed: ${originalSize}MB → ${compressedSize}MB (${reduction}% reduction)`);
}

async function generatePDF(url, theme = 'light') {
  console.log(`🚀 Generating PDF for: ${url} (${theme} theme)`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for some environments
  });

  const page = await browser.newPage();
  console.log('Going to page', page);
  await page.goto(url, { waitUntil: "networkidle2" }); // Ensures all requests finish

  console.log('Point1');

  // 🛠️ Scroll to bottom to trigger lazy-loading
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;

      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });



  await new Promise(async resolve => {
    await setTimeout(() => {
      resolve()
      console.log('Waiting for images to load')
    }, 2000)
  })


  console.log('Point2');

  // 🖼️ Capture full page height
  let height = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewport({ width: 1530, height });

  console.log('Point3');

  const pdfPath = `./public/resume-${theme}.pdf`;
  await page.pdf({
    path: pdfPath,
    // format: "A4",
    printBackground: true,
    width: "1530px",
    height: `${height - 300}px`,
  });

  await browser.close();
  console.log(`✅ PDF saved: ${pdfPath}`);

  // Compress the PDF
  await compressPDF(pdfPath);
}

async function generateBothThemes() {
  console.log('🎨 Generating PDFs for both light and dark themes...');

  // Generate light theme PDF
  const lightUrl = `${baseUrl}&theme=light`;
  await generatePDF(lightUrl, 'light');

  // Generate dark theme PDF
  const darkUrl = `${baseUrl}&theme=dark`;
  await generatePDF(darkUrl, 'dark');

  console.log('🎉 Both PDFs generated successfully!');
}

console.log('Starting PDF generation...');

generateBothThemes().catch((err) => {
  console.error("❌ Error generating PDFs:", err);
});
