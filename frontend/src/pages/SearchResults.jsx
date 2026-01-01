import React, { useState } from 'react';
import { Star, Filter, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css'; // Reusing Home styles for cards

const SearchResults = () => {
  // Dummy data
  const results = [
    {
      id: 1,
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop",
      rating: 4.9,
      price: 1299,
      badge: "Popular"
    },
    {
      id: 2,
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop",
      rating: 4.8,
      price: 899,
      badge: "Best Value"
    },
    {
      id: 3,
      name: "Swiss Alps",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
      rating: 5.0,
      price: 1599,
      badge: null
    },
    {
      id: 4,
      name: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
      rating: 4.9,
      price: 1450,
      badge: "Cultural"
    },
    {
      id: 5,
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2070&auto=format&fit=crop",
      rating: 4.7,
      price: 1100,
      badge: "Romantic"
    },
    {
      id: 6,
      name: "New York, USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
      rating: 4.6,
      price: 950,
      badge: null
    }
  ];

  return (
    <div className="container section">
      <div className="section-header">
        <h2 className="section-title">Search Results</h2>
        <button className="btn btn-outline">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="grid destinations-grid">
        {results.map((trip) => (
          <div key={trip.id} className="card destination-card">
            <div className="card-image-wrapper">
              <img src={trip.image} alt={trip.name} />
              {trip.badge && <div className="card-badge">{trip.badge}</div>}
            </div>
            <div className="card-content">
              <div className="card-header">
                <h3>{trip.name}</h3>
                <div className="rating">
                  <Star size={16} fill="#fbbf24" color="#fbbf24" /> {trip.rating}
                </div>
              </div>
              <p className="price">From <span>${trip.price}</span></p>
              <Link to={`/trip/${trip.id}`} className="btn btn-secondary btn-full">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
