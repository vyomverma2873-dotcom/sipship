import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary shadow-md">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-highlight text-2xl font-bold">Sip & Ship</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-highlight hover:text-accent transition-colors">Home</Link>
            <Link to="/categories" className="text-highlight hover:text-accent transition-colors">Categories</Link>
            <Link to="/offers" className="text-highlight hover:text-accent transition-colors">Offers</Link>
            <Link to="/orders" className="text-highlight hover:text-accent transition-colors">My Orders</Link>
            <Link to="/contact" className="text-highlight hover:text-accent transition-colors">Contact Us</Link>
            <Link to="/login" className="text-highlight hover:text-accent transition-colors">Login/Signup</Link>
            <Link to="/cart" className="relative">
              <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">0</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-highlight focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3">
            <Link to="/" className="block text-highlight hover:text-accent transition-colors py-2">Home</Link>
            <Link to="/categories" className="block text-highlight hover:text-accent transition-colors py-2">Categories</Link>
            <Link to="/offers" className="block text-highlight hover:text-accent transition-colors py-2">Offers</Link>
            <Link to="/orders" className="block text-highlight hover:text-accent transition-colors py-2">My Orders</Link>
            <Link to="/contact" className="block text-highlight hover:text-accent transition-colors py-2">Contact Us</Link>
            <Link to="/login" className="block text-highlight hover:text-accent transition-colors py-2">Login/Signup</Link>
            <Link to="/cart" className="block text-highlight hover:text-accent transition-colors py-2">Cart</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;