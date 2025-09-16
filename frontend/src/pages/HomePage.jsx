import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <div className="bg-[#37353E] text-white">
      {/* Hero Section */}
      <section className="h-[80vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-[#37353E] via-[#44444E] to-[#715A5A] px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
          Sip Back & <span className="text-[#D3DAD9]">Relax</span>
        </h1>
        <p className="max-w-2xl text-lg text-[#D3DAD9] mb-6">
          Premium liquor delivered to your doorstep. Explore an extensive collection
          of spirits, wines, and beers. Anytime, Anywhere.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/products"
            className="px-6 py-3 bg-[#715A5A] hover:bg-[#44444E] rounded-lg transition duration-300"
          >
            Browse Collection
          </Link>
          <Link
            to="/offers"
            className="px-6 py-3 bg-[#44444E] hover:bg-[#715A5A] rounded-lg transition duration-300"
          >
            View Offers
          </Link>
        </div>
      </section>

      {/* Auto-Sliding Carousel */}
      <section className="py-12 bg-[#44444E]">
        <h2 className="text-center text-3xl font-semibold mb-8">Why Choose Us?</h2>
        <div className="max-w-5xl mx-auto px-4">
          <Slider {...settings}>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">🚚 Anytime Liquor Delivery</h3>
              <p>Fast & reliable delivery at your doorstep, 24/7 service in major cities.</p>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">💳 100% Secure Payments</h3>
              <p>Trusted and encrypted transactions for safe and worry-free shopping.</p>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">🥂 Premium Selection</h3>
              <p>Carefully curated spirits, wines, and beers from top global brands.</p>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">🎉 Exclusive Offers</h3>
              <p>Special discounts and deals every weekend to keep the party going.</p>
            </div>
          </Slider>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
