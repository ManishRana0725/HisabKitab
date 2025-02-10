// import QRCode from 'qrcode';
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');
// import path from 'path';
// import fs from 'fs';

// Generate and save QR Code as an image
const generateQRCode = async (friendId) => {
  try {
    const qrData = `https://yourapp.com/pay/${friendId}`;
    const qrImagePath = path.join('public/qrcodes', `${friendId}.png`);

    await QRCode.toFile(qrImagePath, qrData, { width: 300 });

    return `/qrcodes/${friendId}.png`; // Return image URL path
  } catch (error) {
    throw new Error('QR code generation failed');
  }
};
module.exports = generateQRCode;