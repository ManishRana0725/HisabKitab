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
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            "https://hisabkitab-2.onrender.com/friends",
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        let val = 0;
        
        console.log("Friend created:", response.data);

        const qrCodeUrl = response.data.qrCodeUrl;
        console.log("QR code is :" , qrCodeUrl);
        if (qrCodeUrl) {
            console.log("Fetching QR Code from:", qrCodeUrl);
            val = 1;
            try {
                console.log("we are inside and fetching qr code")
                const res = await fetch(qrCodeUrl);
                if (!res.ok) {
                    throw new Error(`Failed to fetch QR code: ${res.statusText}`);
                }

                const blob = await res.blob();
                const objectURL = window.URL.createObjectURL(blob);
                console.log("now we are tring to acces blob adn objectURL")
                const link = document.createElement("a");
                link.href = objectURL;

                link.download = `QR_${formData.name}.png`;
                document.body.appendChild(link);

                link.click();
                document.body.removeChild(link);

                setTimeout(() => {
                    window.URL.revokeObjectURL(objectURL);
                    console.log("✅ ALL steps have completed of downloading a QR which is generated");
                }, 1000);
            } catch (error) {
                console.error("Error fetching QR code:", error);
            }
        }
        console.log("vlaue of vla is :" , val);
        setTimeout(() => {
            navigate("/");
        }, 1000);
    } catch (error) {
        console.error("Error creating friend:", error);
    }
};

  

  return (
    <div className="new-friend-container">
      <form onSubmit={handleSubmit}>
        <h2 className="Newfriend-h2">Add New Friend</h2>

        <label className="Newfriend-label">Friend's Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label className="Newfriend-label">Friend's Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <label className="Newfriend-label">Your ID:</label>
        <input type="text" name="userId" value={formData.userId} readOnly required />  {/* ✅ ReadOnly instead of Disabled */}

        <label className="Newfriend-label">Event Name:</label>
        <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} required />

        <button type="submit" className="createfriend-button">Create Friend</button>
      </form>
    </div>
  );
};

export default NewFriend;
