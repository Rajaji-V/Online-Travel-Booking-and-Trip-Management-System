import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, Shield, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './TripDetails.css';

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

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await API.get(`/trips/${id}`);
        setTrip(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

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

        <div className="details-grid">
          <div className="details-main">
            <div className="image-gallery glass-panel">
              <img src={trip.image} alt={trip.title} className="main-image" />
            </div>

            <div className="description-section section-card glass-panel">
              <h3>About this destination</h3>
              <p>{trip.description}</p>

              <div className="amenities">
                <div className="amenity"><Shield size={20} /> Free Cancellation</div>
                <div className="amenity"><Users size={20} /> Professional Guides</div>
                <div className="amenity"><Calendar size={20} /> Custom Schedules</div>
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

          <div className="details-sidebar">
            <div className="booking-card glass-panel sticky">
              {bookingSuccess ? (
                <div className="success-state fade-in">
                  <CheckCircle size={60} color="#10b981" />
                  <h3>Booking Success!</h3>
                  <p>Your journey to {trip.title} is now confirmed.</p>
                  <button className="btn btn-outline btn-full" onClick={() => setBookingSuccess(false)}>Book Again</button>
                  <Link to="/my-bookings" className="btn btn-primary btn-full" style={{ marginTop: '1rem' }}>View My Bookings</Link>
                </div>
              ) : (
                <>
                  <div className="booking-price">
                    <span className="amount">${trip.price}</span>
                  </div>

                  <form className="booking-form" onSubmit={handleBooking}>
                    <div className="form-group">
                      <label htmlFor="booking-date">
                        <Calendar size={16} />
                        Date
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="booking-guests">
                        <Users size={16} />
                        Guests
                      </label>
                      <div className="guest-selector">
                        <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
                        <span>{guests}</span>
                        <button type="button" onClick={() => setGuests(guests + 1)}>+</button>
                      </div>
                    </div>

                    <div className="price-summary">
                      <div className="summary-row">
                        <span>Base Price</span>
                        <span>${trip.price} × {guests}</span>
                      </div>
                      <div className="summary-row total">
                        <span>Total</span>
                        <span>${trip.price * guests}</span>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-full" disabled={bookingLoading}>
                      {bookingLoading ? "Processing..." : "Reserve Now"}
                    </button>
                  </form>
                  <p className="no-charge-text">You won't be charged yet</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
