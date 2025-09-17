// frontend/src/axiosConfig.js
import axios from "axios";

// ✅ Always point to deployed backend in production
const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001" // local backend
      : "https://sipship-backend.onrender.com", // deployed backend
  withCredentials: false, // ❌ JWT is in localStorage, no cookies
});

export default api;
