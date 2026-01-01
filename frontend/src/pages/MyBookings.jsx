import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MyBookings.css';

const MyBookings = () => {
  const bookings = [
    {
      id: 1,
      tripName: "Paris, France",
      date: "Oct 15, 2025",
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      tripName: "Kyoto, Japan",
      date: "Mar 10, 2024",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="container section">
      <h2 className="section-title">My Bookings</h2>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="glass-panel booking-item fade-in">
            <div className="booking-image">
              <img src={booking.image} alt={booking.tripName} />
            </div>
            <div className="booking-details">
              <h3>{booking.tripName}</h3>
              <div className="booking-meta">
                <span><Calendar size={16} /> {booking.date}</span>
                <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span>
              </div>
            </div>
            <div className="booking-action">
              <Link to={`/trip/${booking.id}`} className="btn btn-outline btn-sm">
                View Trip <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
