import React from 'react';
import { Plane, MapPin, Shield, Award, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <div className="footer-logo">
                            <Plane size={28} />
                            <span>Nova<span className="accent">Travel</span></span>
                        </div>
                        <p className="footer-desc">
                            Your gateway to unforgettable adventures. We make travel dreams come true with premium experiences worldwide.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon"><Facebook size={20} /></a>
                            <a href="#" className="social-icon"><Twitter size={20} /></a>
                            <a href="#" className="social-icon"><Instagram size={20} /></a>
                            <a href="#" className="social-icon"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/search">Explore</Link></li>
                            <li><Link to="/my-bookings">My Trips</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Safety Information</a></li>
                            <li><a href="#">Cancellation Options</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Newsletter</h4>
                        <p>Get travel deals and inspiration delivered to your inbox.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Your email" />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                        <div className="trust-badges">
                            <div className="badge-item">
                                <Shield size={18} />
                                <span>Secure Payments</span>
                            </div>
                            <div className="badge-item">
                                <Award size={18} />
                                <span>Award Winning</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 NovaTravel. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
