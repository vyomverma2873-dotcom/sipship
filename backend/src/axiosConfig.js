// frontend/src/axiosConfig.js
import axios from "axios";

// ✅ Axios instance for API calls
const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001" // Local backend
      : "https://sipship-backend.onrender.com", // Deployed backend
  withCredentials: true,
});

export default api;
