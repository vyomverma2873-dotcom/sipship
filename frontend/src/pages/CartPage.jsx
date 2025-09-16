import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    cartTotals,
    shippingAddress,
    paymentMethod,
    clearCart,
  } = useCart();

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = cartTotals();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5001/api/orders",
        {
          orderItems: cartItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item.product, // 👈 backend ke liye ObjectId
          })),
          shippingAddress: shippingAddress || {
            address: "Ghaziabad",
            city: "Ghaziabad",
            postalCode: "201002",
            country: "India",
          },
          paymentMethod: paymentMethod || "COD",
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        config
      );

      console.log("✅ Order placed:", data);
      alert("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("❌ Failed to place order:", error);
      alert(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary text-highlight py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-secondary rounded-lg">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="p-4 border-b border-gray-700 last:border-b-0 flex items-center"
                >
                  <div className="w-20 h-20 bg-primary rounded-md overflow-hidden mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <span className="font-bold">
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      Quantity: {item.qty}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(item._id, item.qty - 1)
                        }
                        disabled={item.qty <= 1}
                        className="px-2 bg-primary rounded"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item._id, item.qty + 1)
                        }
                        disabled={item.qty >= item.countInStock}
                        className="px-2 bg-primary rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-400 hover:text-red-300 transition-colors ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-secondary rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{itemsPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shippingPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{taxPrice}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="btn-primary w-full py-3"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any products yet.
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
