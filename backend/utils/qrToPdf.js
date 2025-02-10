const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Convert QR code image to PDF
const generateQrPdf = async (friendId) => {
  const qrImagePath = path.join('public/qrcodes', `${friendId}.png`);
  const pdfPath = path.join('public/qrcodes', `${friendId}.pdf`);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);
    doc.text(`QR Code for Friend ID: ${friendId}`, { align: 'center' });
    doc.image(qrImagePath, { fit: [250, 250], align: 'center' });
    doc.end();

    stream.on('finish', () => resolve(`/qrcodes/${friendId}.pdf`));
    stream.on('error', reject);
  });
};

module.exports = generateQrPdf;