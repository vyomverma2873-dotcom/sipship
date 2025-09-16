import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api"; // ✅ backend API instance

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1); // 1 = registration, 2 = OTP verify
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpChange = (e) => setOtp(e.target.value);

  // ✅ Registration handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const { data } = await API.post("/api/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("✅ Signup Response:", data);
      setStep(2); // OTP step
    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ OTP Verification handler
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { data } = await API.post("/api/users/verify", {
        email: formData.email,
        code: otp,
      });

      console.log("✅ Verification Response:", data);
      alert("Account verified successfully!");
      navigate("/login");
    } catch (err) {
      console.error("❌ OTP error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-primary text-highlight py-12">
      <div className="container-custom max-w-md mx-auto">
        <div className="bg-secondary rounded-lg shadow-lg p-8">
          {step === 1 ? (
            <>
              <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

              {error && (
                <div className="mb-4 p-3 bg-red-800/50 text-red-200 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-md"
                  />
                </div>

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

                <div className="mb-4">
                  <label className="block mb-2 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-md"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength="6"
                    className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-accent hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6 text-center">
                Verify Email
              </h1>
              <p className="mb-6 text-center">
                We've sent a verification code to{" "}
                <span className="text-accent">{formData.email}</span>.
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-800/50 text-red-200 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleVerifyOtp}>
                <div className="mb-6">
                  <label className="block mb-2 font-medium">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    required
                    maxLength="6"
                    className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-md text-center text-2xl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3"
                >
                  {isSubmitting ? "Verifying..." : "Verify"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-accent hover:underline"
                >
                  Back to Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;


