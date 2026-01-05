import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Heart, Package, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ bookings: 0, favorites: 0 });
  const [favoriteTrips, setFavoriteTrips] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [bookingsRes, profileRes] = await Promise.all([
        API.get('/bookings/mybookings'),
        API.get('/users/profile')
      ]);

      setStats({
        bookings: bookingsRes.data.length,
        favorites: profileRes.data.favorites?.length || 0
      });

      setFavoriteTrips(profileRes.data.favorites || []);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const joinDate = new Date(user?._id?.toString().substring(0, 8), 16).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Hero */}
        <div className="profile-hero glass-panel">
          <div className="profile-avatar-large">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-header-info">
            <h1>{user?.name}</h1>
            <div className="profile-meta">
              <span><Mail size={16} /> {user?.email}</span>
              <span><Calendar size={16} /> Member since {joinDate}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="profile-stats-grid">
          <div className="stat-card glass-panel">
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
              <Package size={28} color="#6366f1" />
            </div>
            <div className="stat-content">
              <h3>{stats.bookings}</h3>
              <p>Total Bookings</p>
            </div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.1)' }}>
              <Heart size={28} color="#ec4899" />
            </div>
            <div className="stat-content">
              <h3>{stats.favorites}</h3>
              <p>Saved Trips</p>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        {favoriteTrips.length > 0 && (
          <div className="favorites-section">
            <h2 className="section-title">
              <Heart size={24} /> My Favorite Destinations
            </h2>
            <div className="favorites-grid">
              {favoriteTrips.map((trip) => (
                <Link to={`/trip/${trip._id}`} key={trip._id} className="favorite-card glass-panel">
                  <div className="favorite-image">
                    <img src={trip.image} alt={trip.title} />
                  </div>
                  <div className="favorite-info">
                    <h3>{trip.title}</h3>
                    <div className="favorite-location">
                      <MapPin size={14} /> {trip.location}
                    </div>
                    <div className="favorite-price">${trip.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <Link to="/my-bookings" className="action-btn glass-panel">
            <Package size={20} />
            View My Bookings
          </Link>
          <Link to="/search" className="action-btn glass-panel">
            <MapPin size={20} />
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
