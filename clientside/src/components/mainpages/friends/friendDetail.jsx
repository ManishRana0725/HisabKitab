import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FriendDetail.css";

const FriendDetails = () => {
  const { id } = useParams(); // Get friend ID from URL
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendDetails = async () => {
      try {
        // 🔹 Fetch Friend Info (Now includes transactions)
        const { data } = await axios.get(`http://localhost:8080/friends/${id}`);
        setFriend(data.friend);
      } catch (error) {
        console.error("Error fetching friend details:", error);
        setError("Failed to fetch friend details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriendDetails();
  }, [id]);

  return (
    <div className="friend-details-container">
      <h2>Friend Details</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {friend && (
        <div className="friend-info">
          <h3>Name: {friend.name}</h3>
          <p>Phone: {friend.phone}</p>
          
          <h4>Event-wise Transactions:</h4>
          {friend.events.length > 0 ? (
            <ul>
              {friend.events.map((e) => (
                <li key={e.eventId} className="event-card">
                  <strong>Event:</strong> {e.eventName}  
                  <br />
                  <strong>Total Given:</strong> ₹{e.totalGiven}  
                  <br />
                  <strong>Total Received:</strong> ₹{e.totalReceived}  
                </li>
              ))}
            </ul>
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendDetails;
