import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // tumhara frontend isi port pe chal raha hai
    proxy: {
      "/api": "http://localhost:5001", // backend ka URL
    },
  },
});
