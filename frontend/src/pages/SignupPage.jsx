import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ auth context use

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
  const { register, verifyEmail, login } = useAuth(); // ✅ context functions

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      await register(formData.name, formData.email, formData.password);
      setStep(2); // OTP step
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ OTP Verification + Auto Login
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await verifyEmail(formData.email, otp); // backend pe verify
      // ✅ Auto login with same credentials
      await login(formData.email, formData.password);
      navigate("/"); // home pe bhej de
    } catch (err) {
      setError(err.message);
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
                <div className="mb-4 p-3 bg-red-800/50 text-red-200 rounded">{error}</div>
              )}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-2 mb-4 bg-primary border border-gray-600 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-2 mb-4 bg-primary border border-gray-600 rounded-md"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2 mb-4 bg-primary border border-gray-600 rounded-md"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full px-4 py-2 mb-6 bg-primary border border-gray-600 rounded-md"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </form>
              <p className="mt-6 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-accent hover:underline">
                  Login
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6 text-center">Verify Email</h1>
              <p className="mb-6 text-center">
                We’ve sent a verification code to{" "}
                <span className="text-accent">{formData.email}</span>.
              </p>
              {error && (
                <div className="mb-4 p-3 bg-red-800/50 text-red-200 rounded">{error}</div>
              )}
              <form onSubmit={handleVerifyOtp}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  maxLength="6"
                  required
                  className="w-full px-4 py-2 mb-6 bg-primary border border-gray-600 rounded-md text-center text-2xl"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3"
                >
                  {isSubmitting ? "Verifying..." : "Verify & Login"}
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
