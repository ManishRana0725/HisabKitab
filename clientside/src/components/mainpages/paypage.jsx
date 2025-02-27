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
    const upiId = "your-upi-id@upi"; // Replace with actual UPI ID
    const payUrl = `upi://pay?pa=${upiId}&pn=${friend?.name}&mc=&tid=&tr=&tn=Payment&am=${amount}&cu=INR`;
    window.location.href = payUrl; // Redirect to UPI payment app
  };

  // Handle Stripe Payment
//   const handleStripePayment = async () => {
//     try {
//       const response = await axios.post("/api/checkout", { amount, friendId });
//       window.location.href = response.data.checkoutUrl; // Redirect to Stripe
//     } catch (error) {
//       console.error("Error processing payment:", error);
//     }
//   };

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
          {/* <button onClick={handleStripePayment}>Pay via Stripe</button> */}
        </div>
      ) : (
        <p>Friend not found</p>
      )}
    </div>
  );
};

export default PayPage;
