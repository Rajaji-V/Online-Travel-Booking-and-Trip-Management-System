import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Clock, CheckCircle, Star } from 'lucide-react';
import './TripDetails.css';

const TripDetails = () => {
  const { id } = useParams();

  // Dummy data would normally depend on ID
  const trip = {
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    reviews: 124,
    price: 1299,
    duration: "7 Days",
    date: "Available All Year",
    description: "Experience the magic of Paris. From the Eiffel Tower to the Louvre, immerse yourself in art, culture, and cuisine.",
    itinerary: [
      "Day 1: Arrival and Welcome Dinner",
      "Day 2: City Tour & Eiffel Tower",
      "Day 3: Louvre Museum & Seine Cruise",
      "Day 4: Versailles Day Trip",
      "Day 5: Montmartre & Sacré-Cœur",
      "Day 6: Free Day for Shopping",
      "Day 7: Departure"
    ]
  };

  return (
    <div className="trip-details-page">
      <div className="trip-hero" style={{ backgroundImage: `url(${trip.image})` }}>
        <div className="trip-hero-overlay"></div>
        <div className="container trip-hero-content">
          <h1>{trip.name}</h1>
          <div className="trip-meta">
            <span className="meta-item"><MapPin size={18} /> France</span>
            <span className="meta-item"><Star size={18} fill="#fbbf24" color="#fbbf24" /> {trip.rating} ({trip.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="container trip-content-grid">
        <div className="trip-main">
          <section className="glass-panel trip-section">
            <h2>Overview</h2>
            <p>{trip.description}</p>

            <div className="trip-features">
              <div className="feature-box">
                <Clock size={24} className="feature-icon-sm" />
                <span>{trip.duration}</span>
              </div>
              <div className="feature-box">
                <Calendar size={24} className="feature-icon-sm" />
                <span>{trip.date}</span>
              </div>
            </div>
          </section>

          <section className="glass-panel trip-section">
            <h2>Itinerary</h2>
            <ul className="itinerary-list">
              {trip.itinerary.map((day, index) => (
                <li key={index} className="itinerary-item">
                  <CheckCircle size={20} className="check-icon" />
                  <span>{day}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

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
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Guests</label>
                <select>
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                </select>
              </div>
              <button className="btn btn-primary btn-full">Book Now</button>
              <p className="no-charge-text">You won't be charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
