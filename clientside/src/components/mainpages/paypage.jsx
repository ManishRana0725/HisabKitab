import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react"; // ✅ Import QR Code
import "./paypage.css"; // Import CSS

const PayPage = () => {
  const restoreOriginalFormat = (formattedName) => {
    return formattedName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const { formattedEventName, formattedFriendName, friendId } = useParams();
  const originalEventName = restoreOriginalFormat(formattedEventName);
  const originalFriendName = restoreOriginalFormat(formattedFriendName);

  const [friend, setFriend] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // ✅ Track API errors

  useEffect(() => {
    axios
      .get(`https://hisabkitab-2.onrender.com/friends/${friendId}`)
      .then((res) => {
        setFriend(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching friend:", err);
        setError("Failed to fetch friend details.");
        setLoading(false);
      });
  }, [friendId]);

  const handleUPIPayment = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    const upiId = "manishbadm0725@oksbi";
    const payUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(friend?.name)}&am=${amount}&cu=INR&tn=Payment`;
    
    window.location.href = payUrl; 
  };

  // ✅ Prevent using `payUrl` before it's defined
  const payUrl =
    amount && friend
      ? `upi://pay?pa=manishbadm0725@oksbi&pn=${encodeURIComponent(friend.name)}&am=${amount}&cu=INR&tn=Payment`
      : "";

  return (
    <div className="pay-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p> // ✅ Display API errors
      ) : friend ? (
        <div>
          <h2>Pay {originalFriendName}</h2>
          <p>Event: {originalEventName}</p>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleUPIPayment}>Pay via UPI</button>

          {payUrl && <QRCode value={payUrl} size={200} />} {/* ✅ Only render when `payUrl` is ready */}
        </div>
      ) : (
        <p>Friend not found</p>
      )}
    </div>
  );
};

export default PayPage;
