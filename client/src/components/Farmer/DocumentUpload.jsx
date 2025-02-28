import React, { useState } from "react";
import axios from "../../services/api";
import "../../styles/FarmITStyles.css";

const DocumentUpload = () => {
  const [document, setDocument] = useState({
    title: "",
    type: "farm_certificate",
    relatedToModel: "",
    relatedToId: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setDocument({ ...document, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", document.title);
      formData.append("type", document.type);
      formData.append("relatedToModel", document.relatedToModel);
      formData.append("relatedToId", document.relatedToId);
      formData.append("document", file);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post("/documents/upload", formData, config);
      alert("Document uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to upload document");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Upload Document</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <select
            name="type"
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="farm_certificate">Farm Certificate</option>
            <option value="loan_agreement">Loan Agreement</option>
            <option value="identity_proof">Identity Proof</option>
            <option value="other">Other</option>
          </select>
          {/* <input
            type="text"
            name="relatedToModel"
            placeholder="Related Model (Farm/Loan/User)"
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="relatedToId"
            placeholder="Related ID"
            onChange={handleChange}
            style={styles.input}
          /> */}
          <div style={styles.fileInputContainer}>
            <label htmlFor="file-upload" style={styles.fileInputLabel}>
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              required
              style={styles.fileInput}
            />
            {file && <p style={styles.fileName}>{file.name}</p>}
          </div>
          <button type="submit" style={styles.button}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload;

// Inline CSS styles for a beautiful design
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    maxWidth: "500px",
    width: "100%",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
  },
  fileInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  fileInputLabel: {
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "center",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  fileInputLabelHover: {
    backgroundColor: "#0056b3",
  },
  fileInput: {
    display: "none",
  },
  fileName: {
    fontSize: "14px",
    color: "#555",
    textAlign: "center",
    marginTop: "5px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
};