import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, Shield, ArrowLeft, Send, CheckCircle, Download } from 'lucide-react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './TripDetails.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Booking Form
  const [bookingDate, setBookingDate] = useState('');
  const [guests, setGuests] = useState(1);

  // Review Form
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  // Itinerary Edit (Admin)
  const [isEditingItinerary, setIsEditingItinerary] = useState(false);
  const [editedItinerary, setEditedItinerary] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await API.get(`/trips/${id}`);
        setTrip(data);
        setEditedItinerary(data.itinerary || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add Trip Information
    doc.setFontSize(22);
    doc.text(trip.title, 14, 20);

    doc.setFontSize(12);
    doc.text(`Location: ${trip.location}`, 14, 30);
    doc.text(`Price: $${trip.price}`, 14, 37);

    doc.setFontSize(16);
    doc.text("Itinerary", 14, 50);

    // Itinerary Table
    const tableData = trip.itinerary.map(item => [
      `Day ${item.day}`,
      item.activity,
      item.description || ''
    ]);

    autoTable(doc, {
      startY: 55,
      head: [['Day', 'Activity', 'Description']],
      body: tableData,
    });

    doc.save(`${trip.title.replace(/\s+/g, '_')}_Itinerary.pdf`);
  };

  const handleUpdateItinerary = async () => {
    setUpdateLoading(true);
    try {
      const { data } = await API.put(`/trips/${id}`, { itinerary: editedItinerary });
      setTrip(data);
      setIsEditingItinerary(false);
      alert("Itinerary updated successfully!");
    } catch (err) {
      alert("Failed to update itinerary");
    } finally {
      setUpdateLoading(false);
    }
  };

  const addItineraryDay = () => {
    const nextDay = editedItinerary.length + 1;
    setEditedItinerary([...editedItinerary, { day: nextDay, activity: "", description: "" }]);
  };

  const updateItineraryItem = (index, field, value) => {
    const updated = [...editedItinerary];
    updated[index][field] = value;
    setEditedItinerary(updated);
  };

  const removeItineraryDay = (index) => {
    const updated = editedItinerary.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 }));
    setEditedItinerary(updated);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    try {
      await API.post('/bookings', {
        tripId: trip._id,
        date: bookingDate,
        guests: Number(guests),
        totalPrice: trip.price * guests
      });
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      alert("Error creating booking. Please check if you are logged in.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      await API.post(`/trips/${id}/reviews`, { rating, comment });
      const { data } = await API.get(`/trips/${id}`);
      setTrip(data);
      setComment('');
      alert("Review added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <div className="loading-full"><div className="loading-spinner"></div></div>;
  if (!trip) return <div className="container section"><h2>Trip not found</h2></div>;

  return (
    <div className="trip-details-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back to Search
        </button>

        <div className="details-header">
          <div>
            <span className="category-pill">{trip.category}</span>
            <h1>{trip.title}</h1>
            <div className="header-meta">
              <span className="location-info"><MapPin size={18} /> {trip.location}</span>
              <span className="rating-info"><Star size={18} fill="#fbbf24" color="#fbbf24" /> {trip.rating} ({trip.numReviews} Reviews)</span>
            </div>
          </div>
        </div>

        <div className="details-grid-single">
          <div className="details-main-content">
            <div className="image-gallery glass-panel">
              <img src={trip.image} alt={trip.title} className="main-image" />
            </div>

            <div className="description-section section-card glass-panel">
              <div className="section-header-flex">
                <h3>About this destination</h3>
                <div className="section-actions">
                  {trip.itinerary && trip.itinerary.length > 0 && (
                    <button className="btn btn-outline btn-sm download-btn" onClick={downloadPDF}>
                      <Download size={16} /> Download PDF
                    </button>
                  )}
                  {user?.role === 'admin' && !isEditingItinerary && (
                    <button className="btn btn-outline btn-sm" onClick={() => setIsEditingItinerary(true)}>Edit Itinerary</button>
                  )}
                </div>
              </div>
              <p>{trip.description}</p>

              <div className="amenities">
                <div className="amenity"><Shield size={20} /> Free Cancellation</div>
                <div className="amenity"><Users size={20} /> Professional Guides</div>
                <div className="amenity"><Calendar size={20} /> Custom Schedules</div>
              </div>
            </div>

            <div className="itinerary-section section-card glass-panel">
              <div className="section-header-flex">
                <h3>Trip Itinerary</h3>
                {isEditingItinerary && (
                  <div className="admin-itinerary-controls">
                    <button className="btn btn-outline btn-sm" onClick={addItineraryDay}>Add Day</button>
                    <button className="btn btn-primary btn-sm" onClick={handleUpdateItinerary} disabled={updateLoading}>
                      {updateLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => { setIsEditingItinerary(false); setEditedItinerary(trip.itinerary || []); }}>Cancel</button>
                  </div>
                )}
              </div>

              <div className="itinerary-list">
                {isEditingItinerary ? (
                  editedItinerary.map((item, index) => (
                    <div key={index} className="itinerary-edit-item glass-panel">
                      <div className="edit-item-header">
                        <strong>Day {item.day}</strong>
                        <button className="remove-day-btn" onClick={() => removeItineraryDay(index)}>Remove</button>
                      </div>
                      <input
                        type="text"
                        placeholder="Activity"
                        value={item.activity}
                        onChange={(e) => updateItineraryItem(index, 'activity', e.target.value)}
                        className="edit-input"
                      />
                      <textarea
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItineraryItem(index, 'description', e.target.value)}
                        className="edit-textarea"
                      />
                    </div>
                  ))
                ) : (
                  trip.itinerary && trip.itinerary.length > 0 ? (
                    trip.itinerary.map((item, index) => (
                      <div key={index} className="itinerary-item">
                        <div className="itinerary-day">Day {item.day}</div>
                        <div className="itinerary-content">
                          <h4>{item.activity}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    ))
                  ) : <p>No itinerary details available for this trip yet.</p>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section section-card glass-panel">
              <h3>User Reviews ({trip.reviews?.length || 0})</h3>
              <div className="reviews-list">
                {trip.reviews && trip.reviews.length > 0 ? (
                  trip.reviews.map((rev, idx) => (
                    <div key={idx} className="review-item">
                      <div className="review-header">
                        <div className="user-avatar">{rev.name.charAt(0)}</div>
                        <div className="user-info">
                          <strong>{rev.name}</strong>
                          <div className="user-rating">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < rev.rating ? "#fbbf24" : "none"}
                                color={i < rev.rating ? "#fbbf24" : "#475569"}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="review-comment">{rev.comment}</p>
                    </div>
                  ))
                ) : <p>No reviews yet. Be the first to share your experience!</p>}
              </div>

              {user ? (
                <div className="add-review">
                  <h4>Share Your Experience</h4>
                  <form onSubmit={handleReview}>
                    <div className="review-rating-select">
                      <label>Your Rating:</label>
                      <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                      </select>
                    </div>
                    <textarea
                      placeholder="Write your review here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                    <button type="submit" className="btn btn-secondary" disabled={reviewLoading}>
                      {reviewLoading ? "Posting..." : <><Send size={16} /> Post Review</>}
                    </button>
                  </form>
                </div>
              ) : (
                <p className="review-login-msg">Please <Link to="/login">login</Link> to write a review.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="booking-bottom-bar glass-panel">
        <div className="container booking-bar-content">
          {bookingSuccess ? (
            <div className="bar-success-state fade-in">
              <CheckCircle size={24} color="#10b981" />
              <span><strong>Booking Confirmed!</strong> We've sent the details to your email.</span>
              <div className="success-actions">
                <button className="btn btn-outline btn-sm" onClick={() => setBookingSuccess(false)}>Book Another</button>
                <Link to="/my-bookings" className="btn btn-primary btn-sm">My Trips</Link>
              </div>
            </div>
          ) : (
            <form className="bar-form" onSubmit={handleBooking}>
              <div className="bar-price-section">
                <span className="bar-price-label">Price per person</span>
                <span className="bar-price-amount">${trip.price}</span>
              </div>

              <div className="bar-divider"></div>

              <div className="bar-inputs">
                <div className="bar-input-group">
                  <label><Calendar size={14} /> Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>

                <div className="bar-input-group">
                  <label><Users size={14} /> Guests</label>
                  <div className="guests-mini-control">
                    <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
                    <span>{guests}</span>
                    <button type="button" onClick={() => setGuests(guests + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="bar-action">
                <div className="bar-total">
                  <span>Total:</span>
                  <strong>${trip.price * guests}</strong>
                </div>
                <button type="submit" className="btn btn-primary" disabled={bookingLoading}>
                  {bookingLoading ? "Processing..." : "Reserve Now"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
