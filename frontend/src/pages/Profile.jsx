import React from 'react';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="container section">
      <h2 className="section-title">My Profile</h2>

      <div className="glass-panel profile-grid fade-in">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <User size={64} />
          </div>
          <h3 className="profile-name">Akash V</h3>
          <p className="profile-email">akash@example.com</p>
          <button className="btn btn-outline btn-full">Change Avatar</button>
        </div>

        <div className="profile-content">
          <form className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={18} />
                  <input type="text" defaultValue="Akash V" />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={18} />
                  <input type="email" defaultValue="akash@example.com" />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-with-icon">
                  <Phone className="input-icon" size={18} />
                  <input type="tel" defaultValue="+1 234 567 890" />
                </div>
              </div>
              <div className="form-group">
                <label>Location</label>
                <div className="input-with-icon">
                  <MapPin className="input-icon" size={18} />
                  <input type="text" defaultValue="New York, USA" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea rows="4" defaultValue="Travel enthusiast and photographer."></textarea>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
