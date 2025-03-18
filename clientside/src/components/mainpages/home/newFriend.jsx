import { useState, useEffect } from "react";  // ✅ Added useEffect
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./newFriend.css";

const NewFriend = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    userId: "",  // Will be updated when component mounts
    eventName: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    // ✅ Fetch userId from local storage after component mounts
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setFormData((prev) => ({ ...prev, userId: storedUserId }));
    }
  }, []);  // ✅ Runs only once when component mounts

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  
    setSuccessMessage("");  

    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            "https://hisabkitab-2.onrender.com/friends",
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Friend created:", response.data);
        const qrCodeUrl = response.data.qrCodeUrl;

        if (qrCodeUrl) {
            console.log("Generating download link for QR Code...");

            // ✅ Directly create a download link
            const link = document.createElement("a");
            link.href = qrCodeUrl;
            link.download = `QR_${formData.name}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log("✅ QR Code download started.");
            setSuccessMessage("✅ QR Code downloaded successfully!");
        }

        setTimeout(() => {
            navigate("/");
        }, 2000);
    } catch (error) {
        console.error("Error creating friend:", error);
        setSuccessMessage("❌ Failed to download QR Code.");
    } finally {
        setLoading(false);
    }
};



  

  return (
    <div className="new-friend-container">

      {/* ✅ Show loading message when submitting */}
      {loading && <p className="loading-message">⏳ Generating QR Code...</p>}
      {/* ✅ Show success/error message */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <h2 className="Newfriend-h2">Add New Friend</h2>

        <label className="Newfriend-label">Friend's Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label className="Newfriend-label">Friend's Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label className="Newfriend-label">Your ID:</label>
        <input type="text" name="userId" value={formData.userId} readOnly required />  {/* ✅ ReadOnly instead of Disabled */}

        <label className="Newfriend-label">Event Name:</label>
        <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} required />

       <button type="submit" className="createfriend-button" disabled={loading}>
        {loading ? "Creating..." : "Create Friend"}
      </button>
      </form>
    </div>
  );
};

export default NewFriend;
