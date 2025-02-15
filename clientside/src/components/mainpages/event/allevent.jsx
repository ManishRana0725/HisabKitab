import { useEffect, useState } from "react";

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
        console.log("Fetched events:", data); // Debugging
        setEvents(data.events || []); // ✅ Ensure it's always an array
        setError(null); // Clear any previous errors
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
    <div>
      <h2>All Events</h2>

      {/* Show loading state */}
      {loading && <p>Loading events...</p>}

      {/* Show error message if fetching fails */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Show events if fetched successfully */}
      {!loading && !error && events.length > 0 ? (
        events.map(event => (
          <div key={event._id}>{event.name}</div>
        ))
      ) : (
        !loading && !error && <p>No events found</p>
      )}
    </div>
  );
};

export default Events;
