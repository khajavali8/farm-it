import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Make sure this URL matches your backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Ensures cookies are sent if needed
});

export default api;
