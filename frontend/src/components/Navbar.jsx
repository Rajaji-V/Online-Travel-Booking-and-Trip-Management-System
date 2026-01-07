import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Compass, Briefcase, Users, LayoutDashboard, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">
            <Compass className="compass-icon" size={24} />
          </div>
          <span>Nova<span className="accent">Travel</span></span>
        </Link>

        <div className="nav-links desktop-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>Explore</Link>

          {user && (
            <>
              <Link to="/my-bookings" className={location.pathname === '/my-bookings' ? 'active' : ''}>My Trips</Link>
              <Link to="/itinerary" className={location.pathname === '/itinerary' ? 'active' : ''}>Itinerary</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="admin-link">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              )}
            </>
          )}
        </div>

        <div className="nav-auth desktop-auth">
          {user ? (
            <div className="user-dropdown-container">
              <Link to="/profile" className="profile-btn glass-panel">
                <User size={18} />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={logout} className="logout-icon-btn" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn-login">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu glass-panel fade-in">
          <Link to="/">Home</Link>
          <Link to="/search">Explore</Link>
          {user ? (
            <>
              <Link to="/my-bookings">My Trips</Link>
              <Link to="/itinerary">Itinerary</Link>
              <Link to="/profile">Profile</Link>
              {user.role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
              <button onClick={logout} className="btn btn-secondary btn-full">Logout</button>
            </>
          ) : (
            <div className="mobile-auth-btns">
              <Link to="/login" className="btn btn-secondary btn-full">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-full">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
