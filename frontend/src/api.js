import axios from "axios";

// Env variable se API URL lo
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default API;
