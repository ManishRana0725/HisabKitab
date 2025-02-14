const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");

// Generate and save QR Code as an image
const generateQRCode = async (friendId, friendName, eventName) => {
  try {
    // Format event and friend name for URL & file naming
    const formattedEventName = eventName.toLowerCase().replace(/\s+/g, "-"); // Convert spaces to hyphens
    const formattedFriendName = friendName.toLowerCase().replace(/\s+/g, "-");

    // Construct the final URL
    const qrData = `https://localhost:8080/pay/${formattedEventName}/${formattedFriendName}/${friendId}`;
    
    // Ensure directory exists
    const qrDir = path.join(__dirname, "../public/qrcodes");
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    // Define file name based on friend name & event
    const qrImagePath = path.join(qrDir, `${formattedFriendName}-${formattedEventName}.png`);

    // Generate QR Code and save to file
    await QRCode.toFile(qrImagePath, qrData, { width: 300 });

    console.log("QR Code generated:", qrData); // Debugging log

    return `/${formattedFriendName}-${formattedEventName}`; // Return image URL path
  } catch (error) {
    console.error("QR Code Generation Error:", error);
    throw new Error("QR code generation failed");
  }
};

module.exports = generateQRCode;
