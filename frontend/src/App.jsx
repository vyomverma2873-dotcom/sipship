import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import AboutPage from "./pages/AboutPage";
import OffersPage from "./pages/OffersPage";

import AgeVerification from "./components/AgeVerification";
import NotAllowedPage from "./pages/NotAllowedPage";

function AppContent() {
  const location = useLocation();

  // Conditions
  const isNotAllowedPage = location.pathname === "/not-allowed";
  const hideAgePopup = isNotAllowedPage;

  return (
    <div className="flex flex-col min-h-screen bg-[#37353E] text-[#D3DAD9]">
      {/* 👇 Navbar hide on /not-allowed */}
      {!isNotAllowedPage && <Navbar />}

      {/* 👇 Age popup also hide on /not-allowed */}
      {!hideAgePopup && <AgeVerification />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/offers" element={<OffersPage />} />

          {/* Not Allowed Page */}
          <Route path="/not-allowed" element={<NotAllowedPage />} />
        </Routes>
      </main>

      {/* 👇 Footer always show */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
