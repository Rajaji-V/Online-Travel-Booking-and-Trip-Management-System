import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Map, BookOpen, TrendingUp } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const stats = [
    { name: 'Total Users', value: '128', icon: <Users />, color: '#4f46e5' },
    { name: 'Active Trips', value: '24', icon: <Map />, color: '#10b981' },
    { name: 'Total Bookings', value: '456', icon: <BookOpen />, color: '#f59e0b' },
    { name: 'Revenue', value: '$12,450', icon: <TrendingUp />, color: '#ec4899' },
  ];

  return (
    <div className="admin-dashboard container section">
      <h2 className="section-title">Admin Dashboard</h2>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-card glass-panel" style={{ '--border-color': stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-name">{stat.name}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-actions section">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/admin/trips" className="btn btn-secondary">Manage Trips</Link>
          <Link to="/admin/bookings" className="btn btn-secondary">View All Bookings</Link>
          <Link to="/admin/users" className="btn btn-secondary">Manage Users</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
