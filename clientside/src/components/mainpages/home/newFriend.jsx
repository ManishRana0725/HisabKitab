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
      const token = localStorage.getItem("token"); // ✅ Get token from localStorage
      const response = await axios.post("https://hisabkitab-2.onrender.com/friends", formData, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Send token in headers
      });
      console.log("Friend created:", response.data);
      navigate("/"); 
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
