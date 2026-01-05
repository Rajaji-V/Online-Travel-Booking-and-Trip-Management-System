import React, { useEffect, useState } from 'react';
import { Search, MapPin, Star, Plane, Shield, Clock, Compass } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './Home.css';

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Adventure', 'Luxury', 'Beach', 'Cultural'];

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await API.get(`/trips?category=${activeCategory}`);
        setTrips(data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title fade-in">
            Explore the <span className="gradient-text">Unseen Beauty</span> of the World
          </h1>
          <p className="hero-subtitle fade-in">
            Discover hidden gems and book your next adventure with the most premium travel platform.
          </p>

          <form className="search-bar glass-panel fade-in" onSubmit={handleSearch}>
            <div className="search-input-group">
              <MapPin className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <Search size={20} /> Search
            </button>
          </form>
        </div>
      </section>

      {/* Features Info */}
      <section className="container features-tags">
        <div className="tag-card glass-panel">
          <Shield size={24} color="#6366f1" />
          <div>
            <h4>Safe Travels</h4>
            <p>Premium insurance included</p>
          </div>
        </div>
        <div className="tag-card glass-panel">
          <Clock size={24} color="#ec4899" />
          <div>
            <h4>24/7 Support</h4>
            <p>Always here to help you</p>
          </div>
        </div>
        <div className="tag-card glass-panel">
          <Compass size={24} color="#38bdf8" />
          <div>
            <h4>Expert Guides</h4>
            <p>Local pros at your service</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="container section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Trending Destinations</h2>
            <p className="section-subtitle">Most booked places this month</p>
          </div>
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex-center" style={{ minHeight: '300px' }}>
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="grid destinations-grid">
            {trips.map((trip) => (
              <div key={trip._id} className="card destination-card fade-in">
                <div className="card-image-wrapper">
                  <img src={trip.image} alt={trip.title} />
                  <div className="card-badge">{trip.category}</div>
                </div>
                <div className="card-content">
                  <div className="card-header">
                    <h3>{trip.title}</h3>
                    <div className="rating">
                      <Star size={16} fill="#fbbf24" color="#fbbf24" /> {trip.rating}
                      <span className="reviews-count">({trip.numReviews})</span>
                    </div>
                  </div>
                  <div className="card-location">
                    <MapPin size={14} /> {trip.location}
                  </div>
                  <div className="card-footer">
                    <p className="price">From <span>${trip.price}</span></p>
                    <Link to={`/trip/${trip._id}`} className="btn btn-secondary btn-sm">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container extra-section glass-panel">
        <div className="cta-content">
          <h2>Win Your <span className="gradient-text">Dream Trip</span></h2>
          <p>Post your travel stories and win a free ticket to your favorite destination every month!</p>
          <button className="btn btn-primary">Join Community</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
