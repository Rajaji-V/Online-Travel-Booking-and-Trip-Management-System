import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Load bookings from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Cancel booking function
  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      alert("Booking cancelled");

      // Remove from UI without reload
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  if (!bookings.length) {
    return (
      <div className="container section">
        <h2 className="section-title">My Bookings</h2>
        <p>No bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="container section">
      <h2 className="section-title">My Bookings</h2>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking._id} className="glass-panel booking-item fade-in">
            
            <div className="booking-image">
              <img src={booking.image} alt={booking.tripName} />
            </div>

            <div className="booking-details">
              <h3>{booking.tripName}</h3>

              <div className="booking-meta">
                <span>
                  <Calendar size={16} /> {booking.date}
                </span>

                <span className={`status-badge ${booking.status?.toLowerCase()}`}>
                  {booking.status}
                </span>
              </div>
            </div>

            <div className="booking-action">

              <Link
                to={`/trip/${booking.tripId}`}
                className="btn btn-outline btn-sm"
              >
                View Trip <ArrowRight size={16} />
              </Link>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => cancelBooking(booking._id)}
              >
                Cancel
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
