import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import api from "../axiosConfig";

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const flyToCart = (e, image) => {
    const cartIcon = document.getElementById("cart-icon");
    if (!cartIcon) return;
    const img = document.createElement("img");
    img.src = image;
    img.className = "w-12 h-12 rounded-full object-contain fixed z-50 pointer-events-none";
    img.style.top = e.clientY + "px";
    img.style.left = e.clientX + "px";
    document.body.appendChild(img);

    const cartRect = cartIcon.getBoundingClientRect();
    img.animate(
      [
        { transform: `translate(0, 0)`, opacity: 1 },
        { transform: `translate(${cartRect.left - e.clientX}px, ${cartRect.top - e.clientY}px) scale(0.2)`, opacity: 0.5 },
      ],
      { duration: 800, easing: "ease-in-out" }
    ).onfinish = () => {
      img.remove();
      cartIcon.animate([{ transform: "scale(1)" }, { transform: "scale(1.3)" }, { transform: "scale(1)" }], {
        duration: 400,
        easing: "ease-out",
      });
    };
  };

  return (
    <div className="bg-primary text-highlight py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Browse Our Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-secondary rounded-lg p-4 shadow hover:shadow-lg transition">
              <img src={product.image} alt={product.name} className="h-40 mx-auto object-contain" />
              <h3 className="text-lg font-bold mt-4">{product.name}</h3>
              <p className="text-gray-400">₹{product.price}</p>
              <button
                onClick={(e) => {
                  addToCart(product, 1);
                  flyToCart(e, product.image);
                }}
                className="btn-primary mt-4 w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
