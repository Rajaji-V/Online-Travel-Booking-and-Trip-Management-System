import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Star, Filter, Search as SearchIcon, MapPin, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: 'All', minPrice: 0, maxPrice: 5000 });
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const { user, toggleFavorite } = useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await API.get(`/trips?keyword=${query}&category=${filters.category}`);
        const filtered = data.filter(t => t.price >= filters.minPrice && t.price <= filters.maxPrice);
        setResults(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query, filters]);

  const isFavorite = (tripId) => {
    return user?.favorites?.some(fav => fav._id === tripId || fav === tripId);
  };

  return (
    <div className="container section">
      <div className="search-results-header">
        <div>
          <h2 className="section-title">
            {query ? `Results for "${query}"` : 'All Destinations'}
          </h2>
          <p className="section-subtitle">{results.length} destinations found</p>
        </div>

        <div className="filters-panel glass-panel">
          <Filter size={18} />
          <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            <option value="All">All Categories</option>
            <option value="Adventure">Adventure</option>
            <option value="Luxury">Luxury</option>
            <option value="Beach">Beach</option>
            <option value="Cultural">Cultural</option>
          </select>

          <div className="price-range">
            <input
              type="number"
              placeholder="Min $"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max $"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex-center" style={{ minHeight: '400px' }}>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="grid destinations-grid">
          {results.length > 0 ? (
            results.map((trip) => (
              <div key={trip._id} className="card destination-card fade-in">
                <div className="card-image-wrapper">
                  <img src={trip.image} alt={trip.title} />
                  <div className="card-badge">{trip.category}</div>
                  {user && (
                    <button
                      className={`favorite-btn ${isFavorite(trip._id) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(trip._id)}
                    >
                      <Heart size={20} fill={isFavorite(trip._id) ? "#ec4899" : "none"} />
                    </button>
                  )}
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
            ))
          ) : (
            <div className="no-results">
              <SearchIcon size={60} className="text-muted" />
              <h3>No destinations found</h3>
              <p>Try adjusting your filters or search query</p>
              <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
