import React, { useState } from "react";
import API from "../api/axios";
import { PlusCircle, Image as ImageIcon, MapPin, DollarSign, Star, FileText } from 'lucide-react';
import './ManageTrips.css';

const ManageTrips = () => {
  const [trip, setTrip] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    rating: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/trips", trip);
      alert("Trip added successfully!");
      setTrip({
        title: "",
        location: "",
        price: "",
        image: "",
        rating: "",
        description: "",
      });
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error adding trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section manage-trips">
      <div className="section-header">
        <h2 className="section-title">Manage Trips</h2>
        <p className="section-subtitle">Add new adventure destinations for your travelers</p>
      </div>

      <div className="admin-form-container glass-panel fade-in">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label><PlusCircle size={16} /> Trip Title</label>
              <input
                type="text"
                name="title"
                placeholder="Ex: Romantic Paris Getaway"
                value={trip.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><MapPin size={16} /> Location</label>
              <input
                type="text"
                name="location"
                placeholder="Ex: Paris, France"
                value={trip.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><DollarSign size={16} /> Price ($)</label>
              <input
                type="number"
                name="price"
                placeholder="Ex: 1200"
                value={trip.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><ImageIcon size={16} /> Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="URL to destination image"
                value={trip.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label><Star size={16} /> Rating (1.0 - 5.0)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                name="rating"
                placeholder="Ex: 4.8"
                value={trip.rating}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label><FileText size={16} /> Description</label>
              <textarea
                name="description"
                placeholder="Describe the amazing journey..."
                value={trip.description}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full admin-submit-btn"
            disabled={loading}
          >
            {loading ? "Adding Trip..." : "Add New Trip"}
          </button>
        </form>
      </div>

      {trip.image && (
        <div className="preview-section container">
          <h3>Image Preview</h3>
          <div className="preview-card glass-panel">
            <img src={trip.image} alt="Preview" onError={(e) => e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL'} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTrips;
