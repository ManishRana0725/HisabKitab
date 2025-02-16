import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Allfriends.css";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("http://localhost:8080/friends/all");
        setFriends(response.data.friends || []);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setError("Failed to fetch friends.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="friends-container">
      <h2>My Friends</h2>

      {loading && <p>Loading friends...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && friends.length > 0 ? (
        <div className="friends-list">
          {friends.map(friend => (
            <Link to={`/friend/${friend._id}`} key={friend._id} className="friend-card">
              <h3>{friend.name}</h3>
            </Link>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No friends found.</p>
      )}
    </div>
  );
};

export default Friends;
