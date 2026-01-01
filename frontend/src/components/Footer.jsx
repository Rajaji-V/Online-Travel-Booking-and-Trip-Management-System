import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-column brand-column">
                        <h3>TravelGo</h3>
                        <p className="footer-desc">
                            Discover the world with us. Premium travel experiences tailored just for you.
                            Adventure awaits around every corner.
                        </p>
                        <div className="social-icons">
                            <a href="#" className="social-link"><Facebook size={20} /></a>
                            <a href="#" className="social-link"><Twitter size={20} /></a>
                            <a href="#" className="social-link"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/search">Destinations</a></li>
                            <li><a href="/my-bookings">My Bookings</a></li>
                            <li><a href="/login">Login</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Support</h4>
                        <ul className="footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Contact</h4>
                        <ul className="contact-list">
                            <li>
                                <MapPin size={16} /> 123 Travel Street, NY
                            </li>
                            <li>
                                <Phone size={16} /> +1 (555) 123-4567
                            </li>
                            <li>
                                <Mail size={16} /> support@travelgo.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} TravelGo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
