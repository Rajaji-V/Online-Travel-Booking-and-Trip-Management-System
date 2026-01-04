import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, Calendar, Clock, CheckCircle, Star } from "lucide-react";
import "./TripDetails.css";

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking form fields
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/trips/${id}`)
      .then((res) => {
        setTrip(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading trip:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async () => {
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        tripId: trip._id,
        tripName: trip.title,
        image: trip.image,
        date: selectedDate || new Date().toLocaleDateString(),
        guests: guests,
        status: "Upcoming",
        userName: "Guest User" // later will link auth
      });

      alert("Booking Confirmed!");
      window.location.href = "/my-bookings";
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: "40px" }}>
        Loading trip...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="container" style={{ padding: "40px" }}>
        Trip not found.
      </div>
    );
  }

  return (
    <div className="trip-details-page">
      
      {/* Header Banner */}
      <div
        className="trip-hero"
        style={{ backgroundImage: `url(${trip.image})` }}
      >
        <div className="trip-hero-overlay"></div>
        <div className="container trip-hero-content">
          <h1>{trip.title}</h1>

          <div className="trip-meta">
            <span className="meta-item">
              <MapPin size={18} /> {trip.location}
            </span>

            <span className="meta-item">
              <Star size={18} fill="#fbbf24" color="#fbbf24" />{" "}
              {trip.rating || 4.5}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container trip-content-grid">
        
        {/* Left Section */}
        <div className="trip-main">
          <section className="glass-panel trip-section">
            <h2>Overview</h2>
            <p>{trip.description || "No description available for this trip."}</p>

            <div className="trip-features">
              <div className="feature-box">
                <Clock size={24} className="feature-icon-sm" />
                <span>Flexible Duration</span>
              </div>

              <div className="feature-box">
                <Calendar size={24} className="feature-icon-sm" />
                <span>Available All Year</span>
              </div>
            </div>
          </section>

          <section className="glass-panel trip-section">
            <h2>Itinerary</h2>

            <ul className="itinerary-list">
              <li className="itinerary-item">
                <CheckCircle size={20} className="check-icon" />
                <span>Enjoy the best experiences in {trip.location}</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Sidebar Booking Card */}
        <div className="trip-sidebar">
          <div className="glass-panel booking-card">
            
            <div className="price-tag">
              <span className="currency">$</span>
              <span className="amount">{trip.price}</span>
              <span className="per-person">/ person</span>
            </div>

            <div className="booking-form">

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                </select>
              </div>

              <button
                className="btn btn-primary btn-full"
                onClick={handleBooking}
              >
                Book Now
              </button>

              <p className="no-charge-text">
                You won't be charged yet
              </p>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TripDetails;
