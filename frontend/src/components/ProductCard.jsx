/* eslint-disable react/prop-types */
export default function ProductCard({ product }) {
  return (
    <div className="bg-[#44444E] rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-auto object-contain mb-4 rounded"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-[#715A5A] font-medium">{product.price}</p>
      <button className="mt-3 bg-[#715A5A] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition">
        Add to Cart
      </button>
    </div>
  );
}
