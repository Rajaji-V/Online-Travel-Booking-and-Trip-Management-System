import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, MapPin, Calendar, Users, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/trips')
      .then((res) => setTrips(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container fade-in">
          <h1 className="hero-title">
            Explore the <span className="gradient-text">Unseen</span> World
          </h1>
          <p className="hero-subtitle">
            Curated journeys for the modern traveler. Experience luxury, adventure, and culture like never before.
          </p>

          <div className="search-box glass-panel">
            <div className="search-field">
              <MapPin className="search-icon" />
              <input type="text" placeholder="Where do you want to go?" />
            </div>
            <div className="divider"></div>
            <div className="search-field">
              <Calendar className="search-icon" />
              <input type="date" />
            </div>
            <div className="divider"></div>
            <div className="search-field">
              <Users className="search-icon" />
              <select>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3+ Guests</option>
              </select>
            </div>
            <button className="search-btn btn-primary">
              <Search size={20} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Trending Destinations</h2>
          <Link to="/search" className="btn btn-outline">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid destinations-grid">
          {trips.map((trip) => (
            <div className="card destination-card" key={trip._id}>
              <div className="card-image-wrapper">
                <img src={trip.image} alt={trip.title} />
                {trip.tag && <div className="card-badge">{trip.tag}</div>}
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3>{trip.title}</h3>
                  <div className="rating">
                    <Star size={16} fill="#fbbf24" color="#fbbf24" /> {trip.rating}
                  </div>
                </div>

                <p className="price">
                  From <span>${trip.price}</span>
                </p>

                <Link
                  to={`/trip/${trip._id}`}
                  className="btn btn-secondary btn-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <MapPin size={32} />
              </div>
              <h3>Handpicked Destinations</h3>
              <p>We strictly curate our trips to ensure you get the best experience possible.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Calendar size={32} />
              </div>
              <h3>Flexible Booking</h3>
              <p>Plans change. That's why we offer flexible cancellation policies on all bookings.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>24/7 Support</h3>
              <p>Our team is always available to help you with any questions or concerns.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
