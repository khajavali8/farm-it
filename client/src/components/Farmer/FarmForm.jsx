import React, { useState } from 'react';
import axios from '../../services/api';
import '../../styles/FarmITStyles.css';

const FarmForm = () => {
  const [farm, setFarm] = useState({
    name: '',
    location: '',
    size: '',
    farmType: '',
    description: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFarm({ ...farm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first.');
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(farm).forEach((key) => formData.append(key, farm[key]));
      Array.from(images).forEach((image) => formData.append('images', image));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.post('/farms', formData, config);
      alert('Farm registered successfully!');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to register farm');
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Register Your Farm</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="text"
            name="name"
            placeholder="Farm Name"
            onChange={handleChange}
            required
            className="upload-input"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
            className="upload-input"
          />
          <input
            type="text"
            name="size"
            placeholder="Farm Size (acres)"
            onChange={handleChange}
            required
            className="upload-input"
          />
          <input
            type="text"
            name="farmType"
            placeholder="Farm Type"
            onChange={handleChange}
            required
            className="upload-input"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
            className="upload-textarea"
          />
          <div className="file-input-container">
            <label htmlFor="file-upload" className="file-input-label">
              Upload Images
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <button type="submit" className="upload-button">
            Register Farm
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmForm;
