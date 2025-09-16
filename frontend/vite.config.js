import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
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
      // ❌ axios / react-router-dom ko hata do
      // ✅ sirf Node built-ins ya backend related cheezein daalni hain
      external: [
        "fs",
        "path",
        "os",
        "crypto",
        "stream",
        "util",
      ],
    },
  },
});
