import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#37353E] via-[#44444E] to-[#715A5A] text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Sip & Ship</h3>
            <p className="text-gray-200 mb-4">
              Premium liquor delivery service bringing the finest drinks to your doorstep.
            </p>
            <div className="flex space-x-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/imvyomverma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:Vyomverma2873@gmail.com"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                📧
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition duration-300">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition duration-300">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=wine" className="text-gray-300 hover:text-white transition duration-300">Wine</Link></li>
              <li><Link to="/products?category=spirits" className="text-gray-300 hover:text-white transition duration-300">Spirits</Link></li>
              <li><Link to="/products?category=beer" className="text-gray-300 hover:text-white transition duration-300">Beer & Cider</Link></li>
              <li><Link to="/products?category=non-alcoholic" className="text-gray-300 hover:text-white transition duration-300">Non-Alcoholic</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">📍 Ghaziabad, India</p>
              <p className="mb-2">
                <a href="tel:+918766355495" className="hover:text-white transition duration-300">
                  📞 +91 8766355495
                </a>
              </p>
              <p className="mb-2">
                <a href="mailto:Vyomverma2873@gmail.com" className="hover:text-white transition duration-300">
                  📧 Vyomverma2873@gmail.com
                </a>
              </p>
              <p>
                <a href="https://instagram.com/imvyomverma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
                  📱 @imvyomverma
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-200 text-sm">
              &copy; {currentYear} Sip & Ship | Designed by Vyom Verma
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm">
                <li><Link to="/privacy" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white transition duration-300">Terms of Service</Link></li>
                <li><Link to="/shipping" className="text-gray-300 hover:text-white transition duration-300">Shipping Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
