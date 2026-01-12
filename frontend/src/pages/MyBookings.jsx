import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Trash2, Star, DollarSign, Package } from 'lucide-react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, upcoming: 0, spent: 0 });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get('/bookings/mybookings');
      setBookings(data);

      // Calculate stats
      const total = data.length;
      const upcoming = data.filter(b => new Date(b.date) > new Date()).length;
      const spent = data.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      setStats({ total, upcoming, spent });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await API.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      alert('Error canceling booking');
    }
  };

  if (loading) return <div className="loading-full"><div className="loading-spinner"></div></div>;

  return (
    <div className="my-bookings-page">
      <div className="container">
        <h1 className="page-title">My Trips</h1>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card glass-panel">
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
              <Package size={24} color="#6366f1" />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Bookings</p>
              <h3 className="stat-value">{stats.total}</h3>
            </div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <Calendar size={24} color="#10b981" />
            </div>
            <div className="stat-info">
              <p className="stat-label">Upcoming Trips</p>
              <h3 className="stat-value">{stats.upcoming}</h3>
            </div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.1)' }}>
              <DollarSign size={24} color="#ec4899" />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Spent</p>
              <h3 className="stat-value">${stats.spent}</h3>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="empty-state glass-panel">
            <Package size={60} />
            <h3>No bookings yet</h3>
            <p>Start exploring and book your dream destination!</p>
            <button className="btn btn-primary" onClick={() => navigate('/search')}>
              Explore Destinations
            </button>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card glass-panel fade-in">
                <div className="booking-image">
                  <img src={booking.image || booking.tripId?.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'} alt={booking.destination || booking.tripId?.title} />
                  <div className={`status-badge ${booking.status?.toLowerCase()}`}>{booking.status}</div>
                </div>

                <div className="booking-details">
                  <h3>{booking.destination || booking.tripId?.title || 'Trip Details'}</h3>
                  {booking.tripId?.location && <p className="booking-location"><MapPin size={14} /> {booking.tripId.location}</p>}

                  <div className="booking-meta">
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>{booking.date ? new Date(booking.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Date not set'}</span>
                    </div>

                    <div className="meta-item">
                      <Users size={16} />
                      <span>{booking.guests || 0} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>

                    <div className="meta-item price-meta">
                      <DollarSign size={16} />
                      <span>${booking.totalPrice || (booking.tripId?.price * booking.guests) || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-actions">
                  <button
                    className="btn-icon delete-btn"
                    onClick={() => handleCancel(booking._id)}
                    title="Cancel Booking"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
