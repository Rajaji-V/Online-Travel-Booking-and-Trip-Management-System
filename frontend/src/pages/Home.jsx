import React from 'react';
import { Search, MapPin, Calendar, Users, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
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
          <Link to="/search" className="btn btn-outline">View All <ArrowRight size={16} /></Link>
        </div>

        <div className="grid destinations-grid">
          {/* Card 1 */}
          <div className="card destination-card">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop" alt="Paris" />
              <div className="card-badge">Popular</div>
            </div>
            <div className="card-content">
              <div className="card-header">
                <h3>Paris, France</h3>
                <div className="rating">
                  <Star size={16} fill="#fbbf24" color="#fbbf24" /> 4.9
                </div>
              </div>
              <p className="price">From <span>$1,299</span></p>
              <Link to="/trip/1" className="btn btn-secondary btn-full">View Details</Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card destination-card">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop" alt="Bali" />
              <div className="card-badge">Best Value</div>
            </div>
            <div className="card-content">
              <div className="card-header">
                <h3>Bali, Indonesia</h3>
                <div className="rating">
                  <Star size={16} fill="#fbbf24" color="#fbbf24" /> 4.8
                </div>
              </div>
              <p className="price">From <span>$899</span></p>
              <Link to="/trip/2" className="btn btn-secondary btn-full">View Details</Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card destination-card">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1542051841857-5f906991e8c1?q=80&w=2070&auto=format&fit=crop" alt="Swiss Alps" />
            </div>
            <div className="card-content">
              <div className="card-header">
                <h3>Swiss Alps</h3>
                <div className="rating">
                  <Star size={16} fill="#fbbf24" color="#fbbf24" /> 5.0
                </div>
              </div>
              <p className="price">From <span>$1,599</span></p>
              <Link to="/trip/3" className="btn btn-secondary btn-full">View Details</Link>
            </div>
          </div>
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
