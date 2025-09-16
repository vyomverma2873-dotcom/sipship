import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { userInfo, updateProfile, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    // Clear success message after 3 seconds
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const submitHandler = async (e) => {
    e.preventDefault();
    clearError();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const userData = {
          name,
          email,
          ...(password && { password }),
        };

        await updateProfile(userData);
        setSuccessMessage('Profile updated successfully');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        setMessage(error.message);
      }
    }
  };

  return (
    <div className="bg-primary text-highlight py-10">
      <div className="container-custom max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        
        {message && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-secondary text-highlight border border-gray-600 focus:border-accent focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-secondary text-highlight border border-gray-600 focus:border-accent focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password (leave blank to keep current)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-secondary text-highlight border border-gray-600 focus:border-accent focus:outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded bg-secondary text-highlight border border-gray-600 focus:border-accent focus:outline-none"
            />
          </div>
          
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          <div className="bg-secondary p-4 rounded">
            <p className="text-center text-gray-400">
              No orders found. Start shopping to see your order history here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;