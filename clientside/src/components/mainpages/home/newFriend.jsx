import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./newFriend.css"
const NewFriend = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    userId: "",
    eventName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/friends", formData);
      console.log("Friend created:", response.data);
      navigate("/"); // Redirect to home after successful creation
    } catch (error) {
      console.error("Error creating friend:", error);
    }
  };

  return (
    <div className="new-friend-container">
      
      <form onSubmit={handleSubmit}>
        <h2 className="Newfriend-h2">Add New Friend</h2>
        <label className="Newfriend-label">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label className="Newfriend-label">Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <label className="Newfriend-label">User ID:</label>
        <input type="text" name="userId" value={formData.userId} onChange={handleChange} required />

        <label className="Newfriend-label">Event Name:</label>
        <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} required />

        <button type="submit" className="createfriend-button">Create Friend</button>
      </form>
    </div>
  );
};

export default NewFriend;
