import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // ✅ Explicit API URL + backend se product _id milta hai
        const { data } = await axios.get(`http://localhost:5001/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="bg-primary text-highlight py-12">
        <div className="container-custom">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-primary text-highlight py-12">
        <div className="container-custom">
          <p className="text-red-500">{error || "Product not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary text-highlight py-12">
      <div className="container-custom">
        <div className="mb-6">
          <Link
            to="/products"
            className="text-accent hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-secondary rounded-lg overflow-hidden p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[400px] object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-300 mb-4">{product.description}</p>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">Price</span>
                <span className="text-2xl font-bold">₹{product.price}</span>
              </div>
              {product.countInStock > 0 ? (
                <p className="text-green-400">In Stock</p>
              ) : (
                <p className="text-red-400">Out of Stock</p>
              )}
            </div>

            <div className="flex items-center mb-6">
              <div className="mr-4">
                <label htmlFor="quantity" className="block mb-1 text-sm">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 px-3 py-2 bg-secondary border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button
                onClick={() => addToCart(product, quantity)} // ✅ ab _id milega
                className="flex-1 btn-primary py-3"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
