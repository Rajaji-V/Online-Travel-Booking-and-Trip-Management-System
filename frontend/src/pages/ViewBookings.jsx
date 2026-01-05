import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Calendar, User, Mail, Clock, AlertCircle } from 'lucide-react';
import './ViewBookings.css';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const { data } = await API.get('/bookings');
        setBookings(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchAllBookings();
  }, []);

  if (loading) return <div className="container section">Loading all bookings...</div>;
  if (error) return <div className="container section text-danger">{error}</div>;

  return (
    <div className="container section">
      <h2 className="section-title">All System Bookings</h2>

      {!bookings.length ? (
        <div className="empty-state">
          <AlertCircle size={48} />
          <p>No bookings found in the system.</p>
        </div>
      ) : (
        <div className="admin-table-container glass-panel fade-in">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Guests</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>
                    <div className="table-cell-trip">
                      <strong>{booking.tripName}</strong>
                      <span className="text-muted">{booking.tripId?._id}</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-cell-user">
                      <span><User size={14} /> {booking.user?.name || 'Unknown'}</span>
                      <span className="text-muted"><Mail size={14} /> {booking.user?.email || 'N/A'}</span>
                    </div>
                  </td>
                  <td><Calendar size={14} /> {booking.date}</td>
                  <td>{booking.guests}</td>
                  <td>
                    <span className={`status-badge ${booking.status?.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewBookings;
