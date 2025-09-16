import React from "react";
import { useCart } from "../context/CartContext";

const ProductsPage = () => {
  const { addToCart } = useCart();

  const products = [
    {
      _id: "1",
      name: "Bacardi Limon Rum",
      price: 1350,
      countInStock: 20,
      image: "https://www.thebottleclub.com/cdn/shop/products/bacardi-limon-70cl.jpg",
    },
    {
      _id: "2",
      name: "Bro Code Beer 15%",
      price: 160,
      countInStock: 50,
      image: "https://i.ibb.co/7WGy6Sj/bro-code-beer.jpg",
    },
    {
      _id: "3",
      name: "100 Pipers Blended Scotch",
      price: 1450,
      countInStock: 15,
      image: "https://www.thewhiskyworld.com/images/100-pipers-deluxe-scotch-whisky-p2077-12791_image.jpg",
    },
    {
      _id: "4",
      name: "Smirnoff Green Apple Vodka",
      price: 1350,
      countInStock: 12,
      image: "https://www.thebottleclub.com/cdn/shop/products/smirnoff-green-apple-70cl.jpg",
    },
    {
      _id: "5",
      name: "Absolut Vodka",
      price: 1500,
      countInStock: 18,
      image: "https://www.thewhiskyworld.com/images/absolut-vodka-70cl-p1662-11377_image.jpg",
    },
    {
      _id: "6",
      name: "Rockford Classic Whisky",
      price: 1250,
      countInStock: 20,
      image: "https://www.whiskyshop.com/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/r/o/rockford-classic-750ml.jpg",
    },
    {
      _id: "7",
      name: "Budweiser Magnum Beer",
      price: 180,
      countInStock: 40,
      image: "https://i.ibb.co/4W0wPZn/budweiser-magnum.png",
    },
    {
      _id: "8",
      name: "Indri-Trini Indian Whisky",
      price: 1450,
      countInStock: 10,
      image: "https://www.thewhiskyworld.com/images/indri-trini-the-three-wood-indian-single-malt-p4183-19172_image.jpg",
    },
    {
      _id: "9",
      name: "Old Monk Rum",
      price: 700,
      countInStock: 25,
      image: "https://www.thewhiskyworld.com/images/old-monk-7-year-old-rum-p3568-17430_image.jpg",
    },
  ];

  // ✨ Fly to Cart Animation
  const flyToCart = (e, image) => {
    const cartIcon = document.getElementById("cart-icon");
    if (!cartIcon) return;

    const img = document.createElement("img");
    img.src = image;
    img.className =
      "w-12 h-12 rounded-full object-contain fixed z-50 pointer-events-none";
    img.style.top = e.clientY + "px";
    img.style.left = e.clientX + "px";
    document.body.appendChild(img);

    const cartRect = cartIcon.getBoundingClientRect();
    img.animate(
      [
        { transform: `translate(0, 0)`, opacity: 1 },
        {
          transform: `translate(${cartRect.left - e.clientX}px, ${
            cartRect.top - e.clientY
          }px) scale(0.2)`,
          opacity: 0.5,
        },
      ],
      {
        duration: 800,
        easing: "ease-in-out",
      }
    ).onfinish = () => {
      img.remove();

      // ✨ Bounce effect on cart icon
      cartIcon.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.3)" },
          { transform: "scale(1)" },
        ],
        {
          duration: 400,
          easing: "ease-out",
        }
      );
    };
  };

  return (
    <div className="bg-primary text-highlight py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Browse Our Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-secondary rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 mx-auto object-contain"
              />
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
