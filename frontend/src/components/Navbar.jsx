// frontend/src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ✅ auth context import

function Navbar() {
  const { itemCount } = useCart();
  const { userInfo, logout } = useAuth(); // ✅ user info aur logout liya

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Sip & Ship
        </h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-lg font-medium">
            {["Home", "Products", "About", "Contact"].map((item, i) => (
              <li key={i}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="px-4 py-2 rounded-lg text-white transition-all duration-300 transform hover:scale-110 hover:font-bold hover:bg-[#44444E] hover:text-[#D3DAD9]"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side (Cart + Auth) */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link
            to="/cart"
            id="cart-icon"
            className="relative px-4 py-2 rounded-lg text-white transition-all duration-300 transform hover:scale-110 hover:font-bold hover:bg-[#44444E] hover:text-[#D3DAD9]"
          >
            🛒 Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          {userInfo ? (
            <div className="flex items-center space-x-3">
              {/* ✅ Welcome message */}
              <span className="text-white font-medium">
                👋 Welcome, <strong>{userInfo.name}</strong>
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-[#715A5A] hover:bg-[#44444E] rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-110 hover:font-bold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
