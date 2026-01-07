import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Plus, Calendar, Clock, MapPin, Trash2, Edit2, List } from 'lucide-react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ItineraryForm from '../components/ItineraryForm';
import './ItineraryPage.css';

const ItineraryPage = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingItinerary, setEditingItinerary] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchItineraries();
    }, [user, navigate]);

    const fetchItineraries = async () => {
        try {
            const { data } = await API.get('/itineraries');
            setItineraries(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingItinerary(null);
        setShowForm(true);
    };

    const handleEdit = (itinerary) => {
        setEditingItinerary(itinerary);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this itinerary?')) return;
        try {
            await API.delete(`/itineraries/${id}`);
            fetchItineraries();
        } catch (err) {
            alert('Error deleting itinerary');
        }
    };

    const handleSave = async (formData) => {
        try {
            if (editingItinerary) {
                await API.put(`/itineraries/${editingItinerary._id}`, formData);
            } else {
                await API.post('/itineraries', formData);
            }
            setShowForm(false);
            fetchItineraries();
        } catch (err) {
            alert('Error saving itinerary');
            console.error(err);
        }
    };

    if (loading) return <div className="loading-full"><div className="loading-spinner"></div></div>;

    return (
        <div className="itinerary-page">
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">My Itineraries</h1>
                        <p className="page-subtitle">Plan your perfect trip day by day</p>
                    </div>
                    {!showForm && (
                        <button className="btn btn-primary" onClick={handleCreate}>
                            <Plus size={20} /> New Itinerary
                        </button>
                    )}
                </div>

                {showForm ? (
                    <ItineraryForm
                        initialData={editingItinerary}
                        onSave={handleSave}
                        onCancel={() => setShowForm(false)}
                    />
                ) : (
                    <>
                        {itineraries.length === 0 ? (
                            <div className="empty-state glass-panel">
                                <Map size={60} />
                                <h3>No itineraries yet</h3>
                                <p>Start planning your next adventure!</p>
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    Create Itinerary
                                </button>
                            </div>
                        ) : (
                            <div className="itinerary-grid">
                                {itineraries.map((itinerary) => (
                                    <div key={itinerary._id} className="itinerary-card glass-panel fade-in">
                                        <div className="card-header">
                                            <h3>{itinerary.title}</h3>
                                            <div className="card-actions">
                                                <button onClick={() => handleEdit(itinerary)} className="btn-icon">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(itinerary._id)} className="btn-icon delete-btn">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="activities-preview">
                                            <div className="preview-label">
                                                <List size={14} /> {itinerary.activities.length} Activities
                                            </div>
                                            <div className="activities-timeline">
                                                {itinerary.activities.slice(0, 3).map((activity, idx) => (
                                                    <div key={idx} className="timeline-item">
                                                        <div className="timeline-dot"></div>
                                                        <div className="timeline-content">
                                                            <span className="timeline-time">
                                                                {activity.time || 'All Day'}
                                                            </span>
                                                            <span className="timeline-desc">{activity.description}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                                {itinerary.activities.length > 3 && (
                                                    <div className="more-activities">
                                                        +{itinerary.activities.length - 3} more
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ItineraryPage;
