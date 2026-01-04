import React, { useState } from "react";
import axios from "axios";

const ManageTrips = () => {
  const [trip, setTrip] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    rating: "",
    description: "",
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/trips", trip);
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
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Manage Trips</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "420px",
          padding: "20px",
          borderRadius: "16px",
          background: "#f8fafc",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Trip Title"
          value={trip.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          type="text"
          name="location"
          placeholder="Location (ex: Paris, France)"
          value={trip.location}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={trip.price}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={trip.image}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating (optional)"
          value={trip.rating}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />

        <textarea
          name="description"
          placeholder="Short description"
          value={trip.description}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "18px" }}
        />

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            letterSpacing: "0.3px",
          }}
        >
          Add Trip
        </button>
      </form>
    </div>
  );
};

export default ManageTrips;
