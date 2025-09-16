import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ animation

const CheckoutPage = () => {
  const {
    cartItems,
    shippingAddress,
    saveShippingAddress,
    paymentMethod,
    savePaymentMethod,
    cartTotals,
    clearCart,
  } = useCart();

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = cartTotals();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
    phone: shippingAddress?.phone || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      saveShippingAddress(form);
      savePaymentMethod(paymentMethod);

      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item.product,
          })),
          shippingAddress: form,
          paymentMethod: paymentMethod || "COD",
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        config
      );

      console.log("✅ Order placed:", data);
      clearCart();

      // ✅ Show success message
      setSuccessMessage("✅ Order placed successfully! Thank you for shopping with us.");
    } catch (err) {
      console.error("❌ Failed to place order:", err);
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-hide success + redirect after 4s
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        navigate("/"); // redirect to home
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  return (
    <div className="bg-primary text-highlight py-12 relative">
      <div className="container-custom max-w-2xl mx-auto bg-secondary rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {/* ✅ Modern Toast Animation */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-medium z-50"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ Show error */}
        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-4 text-lg font-medium">
            {error}
          </div>
        )}

        {/* ✅ Only show checkout form if order not placed */}
        {!successMessage && (
          <>
            <div className="mb-6 text-left">
              <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="p-3 rounded bg-primary text-white"
                />
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="p-3 rounded bg-primary text-white"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="p-3 rounded bg-primary text-white"
                />
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="p-3 rounded bg-primary text-white"
                />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="col-span-2 p-3 rounded bg-primary text-white"
                />
              </div>
            </div>

            <div className="mb-6 text-left">
              <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
              <label className="block mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "COD"}
                  onChange={() => savePaymentMethod("COD")}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "UPI"}
                  onChange={() => savePaymentMethod("UPI")}
                  className="mr-2"
                />
                UPI Payment
              </label>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{itemsPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹{shippingPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>₹{taxPrice}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
