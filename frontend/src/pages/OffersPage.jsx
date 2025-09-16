export default function OffersPage() {
  const offers = [
    {
      id: 1,
      title: "Free Delivery",
      description: "Get free delivery on all orders above ₹2000",
      code: "FREE2000",
    },
    {
      id: 2,
      title: "First Order Discount",
      description: "Get 10% off on your first order. Maximum discount ₹500",
      code: "WELCOME10",
    },
    {
      id: 3,
      title: "Weekend Special",
      description: "Extra 5% off on weekend orders (Friday–Sunday)",
      code: "WEEKEND5",
    },
    {
      id: 4,
      title: "Festive Offer",
      description: "Flat ₹300 off on all premium whiskies during festivals",
      code: "FESTIVE300",
    },
  ];

  return (
    <div className="px-6 py-10">
      <h1 className="text-center text-3xl font-bold mb-8 text-[#D3DAD9]">
        Exclusive Offers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-[#44444E] p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-semibold mb-2 text-white">
              {offer.title}
            </h2>
            <p className="text-[#D3DAD9] mb-4">{offer.description}</p>
            <div className="flex items-center justify-between">
              <span className="bg-[#715A5A] text-white px-3 py-1 rounded-md">
                {offer.code}
              </span>
              <button
                className="bg-[#D3DAD9] text-[#37353E] px-3 py-1 rounded-md hover:bg-opacity-80"
                onClick={() => navigator.clipboard.writeText(offer.code)}
              >
                Copy Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
