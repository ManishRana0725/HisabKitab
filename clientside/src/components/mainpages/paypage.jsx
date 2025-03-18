import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./paypage.css"; // Import CSS
const PayPage = () => {
  const restoreOriginalFormat = (formattedName) => {
    return formattedName
      .split("-") // Split at hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
      .join(" "); // Join back with spaces
  };
  const {  formattedEventName, formattedFriendName, friendId  } = useParams();
  const originalEventName = restoreOriginalFormat(formattedEventName);
  const originalFriendName = restoreOriginalFormat(formattedFriendName);
  const [friend, setFriend] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch friend details

  useEffect(() => {

    axios
      .get(`https://hisabkitab-2.onrender.com/friends/${friendId}`)
      .then((res) => {
        setFriend(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching friend:", err);
        setLoading(false);
      });
      
  }, [friendId]);

  // Handle UPI Payment
  const handleUPIPayment = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    const upiId = "manishbadm0725@oksbi"; // Replace with actual UPI ID
    const payUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(friend?.name)}&am=${amount}&cu=INR&tn=Payment`;
    
    window.location.href = payUrl; // Redirect to UPI payment app
  };

  return (
    <div className="pay-container">
      {loading ? (
        <p>Loading...</p>
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

          {/* UPI QR Code for Desktop Users */}
          <QRCode value={payUrl} size={200} />
        </div>
      ) : (
        <p>Friend not found</p>
      )}
    </div>

  );
};

export default PayPage;
