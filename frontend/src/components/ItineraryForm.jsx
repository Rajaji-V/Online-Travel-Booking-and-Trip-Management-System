import React, { useState } from 'react';
import { Plus, Trash2, Calendar, MapPin, Clock } from 'lucide-react';
import './ItineraryForm.css';

const ItineraryForm = ({ onSave, onCancel, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '',
        activities: [{ date: '', time: '', description: '', location: '' }]
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleActivityChange = (index, field, value) => {
        const newActivities = [...formData.activities];
        newActivities[index][field] = value;
        setFormData({ ...formData, activities: newActivities });
    };

    const addActivity = () => {
        setFormData({
            ...formData,
            activities: [...formData.activities, { date: '', time: '', description: '', location: '' }]
        });
    };

    const removeActivity = (index) => {
        const newActivities = formData.activities.filter((_, i) => i !== index);
        setFormData({ ...formData, activities: newActivities });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="itinerary-form glass-panel fade-in">
            <h2 className="form-title">{initialData ? 'Edit Itinerary' : 'Create New Itinerary'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Itinerary Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Summer Trip to Paris"
                        required
                        className="form-input"
                    />
                </div>

                <div className="activities-section">
                    <h3>Activities</h3>
                    {formData.activities.map((activity, index) => (
                        <div key={index} className="activity-row glass-panel">
                            <div className="activity-header">
                                <span className="activity-number">#{index + 1}</span>
                                {formData.activities.length > 1 && (
                                    <button type="button" onClick={() => removeActivity(index)} className="btn-icon delete-btn">
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="activity-grid">
                                <div className="form-group">
                                    <div className="input-icon-wrapper">
                                        <Calendar size={16} className="input-icon" />
                                        <input
                                            type="date"
                                            value={activity.date ? activity.date.split('T')[0] : ''}
                                            onChange={(e) => handleActivityChange(index, 'date', e.target.value)}
                                            required
                                            className="form-input with-icon"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-icon-wrapper">
                                        <Clock size={16} className="input-icon" />
                                        <input
                                            type="time"
                                            value={activity.time}
                                            onChange={(e) => handleActivityChange(index, 'time', e.target.value)}
                                            className="form-input with-icon"
                                        />
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <textarea
                                        placeholder="Description (e.g., Visit Eiffel Tower)"
                                        value={activity.description}
                                        onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                                        required
                                        className="form-input scrollbar-clean"
                                        rows="2"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <div className="input-icon-wrapper">
                                        <MapPin size={16} className="input-icon" />
                                        <input
                                            type="text"
                                            placeholder="Location"
                                            value={activity.location}
                                            onChange={(e) => handleActivityChange(index, 'location', e.target.value)}
                                            className="form-input with-icon"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button type="button" onClick={addActivity} className="btn btn-secondary btn-sm add-activity-btn">
                        <Plus size={16} /> Add Activity
                    </button>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Itinerary</button>
                </div>
            </form>
        </div>
    );
};

export default ItineraryForm;
