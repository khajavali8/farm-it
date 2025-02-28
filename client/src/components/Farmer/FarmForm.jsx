import React, { useState } from 'react';
import axios from '../../services/api';
import '../../App.css';
import "../../styles/FarmITStyles.css";

const FarmForm = () => {
  const [farm, setFarm] = useState({ name: '', location: '', size: '', farmType: '', description: '' });
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register Your Farm</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Farm Name"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="size"
            placeholder="Farm Size (acres)"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="farmType"
            placeholder="Farm Type"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
            style={styles.textarea}
          />
          <div style={styles.fileInputContainer}>
            <label htmlFor="file-upload" style={styles.fileInputLabel}>
              Upload Images
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>
          <button type="submit" style={styles.button}>
            Register Farm
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmForm;

// Inline CSS styles for a beautiful design
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    height: '120px',
    resize: 'vertical',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  fileInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  fileInputLabel: {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  fileInputLabelHover: {
    backgroundColor: '#0056b3',
  },
  fileInput: {
    display: 'none',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
};