import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Mock product data (will be replaced with API call)
  const mockProducts = [
    {
      id: '1',
      name: 'Royal Stag',
      type: 'Whisky',
      size: '750ml',
      price: 650,
      alcoholPercentage: 42.8,
      image: 'https://www.pernod-ricard.com/sites/default/files/styles/product_detail_page_top_image/public/2023-03/Royal%20Stag%20Barrel%20Select.png?itok=Yw-Yd9Iy',
      description: 'Royal Stag is a premium whisky blend launched in 1995. It is a smooth blend of imported Scotch malts and selected Indian grain spirits. It has a rich aroma and a smooth taste with a smoky finish.'
    },
    {
      id: '2',
      name: 'Blenders Pride',
      type: 'Whisky',
      size: '750ml',
      price: 850,
      alcoholPercentage: 42.8,
      image: 'https://www.pernod-ricard.com/sites/default/files/styles/product_detail_page_top_image/public/2023-03/Blenders%20Pride%20Reserve%20Collection.png?itok=Yw-Yd9Iy',
      description: 'Blenders Pride is a premium Indian whisky brand owned by Pernod Ricard. It is a blend of imported Scotch malts and Indian grain spirits. It has a smooth taste with a hint of vanilla and a smoky finish.'
    },
    // Add more products as needed
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      try {
        // Replace with actual API call when backend is ready
        // const response = await fetch(`/api/products/${id}`);
        // const data = await response.json();
        // setProduct(data);
        
        // Using mock data for now
        setTimeout(() => {
          const foundProduct = mockProducts.find(p => p.id === id) || {
            id,
            name: `Product ${id}`,
            type: 'Whisky',
            size: '750ml',
            price: 1000,
            alcoholPercentage: 40,
            image: 'https://via.placeholder.com/400',
            description: 'This is a premium quality product with a smooth taste and rich aroma.'
          };
          setProduct(foundProduct);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching product:', error);
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

  const handleAddToCart = () => {
    // This will be replaced with actual cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`);
    alert(`Added ${quantity} of ${product.name} to cart`);
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

  return (
    <div className="bg-primary text-highlight py-12">
      <div className="container-custom">
        <div className="mb-6">
          <Link to="/categories" className="text-accent hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
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
            <div className="flex items-center mb-4">
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">{product.type}</span>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">Size</span>
                <span className="text-lg font-medium">{product.size}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">Alcohol Content</span>
                <span className="text-lg font-medium">{product.alcoholPercentage}% ABV</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">Price</span>
                <span className="text-2xl font-bold">₹{product.price}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-300">{product.description}</p>
            </div>

            <div className="flex items-center mb-6">
              <div className="mr-4">
                <label htmlFor="quantity" className="block mb-1 text-sm">Quantity</label>
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
                onClick={handleAddToCart}
                className="flex-1 btn-primary py-3"
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