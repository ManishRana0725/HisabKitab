import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Allevent.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/event/all")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched events:", data);
        setEvents(data.events || []);
        setError(null);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="events-container">
      <h2>All Events</h2>

      {/* New Event Button */}
      <div className="new-event-container">
        <Link to="/create-event" className="new-event-btn">
          New Event
        </Link>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && events.length > 0 ? (
        <div className="event-list">
          {events.map(event => (
            <Link to={`/event/${event._id}`} key={event._id} className="event-card" >
              {event.name}
            </Link>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No events found</p>
      )}
    </div>
  );
};

export default Events;
