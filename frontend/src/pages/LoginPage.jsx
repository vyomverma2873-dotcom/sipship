import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth(); // ✅ context se login
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const data = await login(formData.email, formData.password); // ✅ context ka login
      console.log("✅ Login Response:", data);
      navigate("/");
    } catch (err) {
      console.error("❌ Login error:", err.message);
      setError(err.message || "Invalid credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-primary text-highlight py-12">
      <div className="container-custom max-w-md mx-auto">
        <div className="bg-secondary rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-800/50 text-red-200 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-md"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-md"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-accent hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
