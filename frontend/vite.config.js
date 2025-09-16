import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // local development ke liye
    proxy: {
      "/api": "http://localhost:5001", // local backend ka URL
    },
  },
  build: {
    rollupOptions: {
      external: ["axios", "react-router-dom"], // 👈 ye add kiya
    },
  },
});
