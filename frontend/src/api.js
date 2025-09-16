import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // backend ka port
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // credentials bhejne ke liye
});

export default API;
