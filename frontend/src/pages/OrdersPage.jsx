import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from your API
        // const response = await fetch('/api/orders/myorders', {
        //   headers: {
        //     Authorization: `Bearer ${userInfo.token}`,
        //   },
        // });
        // const data = await response.json();
        
        // For now, using mock data
        const mockOrders = [
          {
            _id: '1',
            createdAt: '2023-06-15T10:30:00Z',
            totalPrice: 89.97,
            isPaid: true,
            paidAt: '2023-06-15T10:35:00Z',
            isDelivered: true,
            deliveredAt: '2023-06-16T14:20:00Z',
            orderItems: [
              {
                name: 'Premium Red Wine',
                qty: 2,
                image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3',
                price: 29.99,
                product: '1',
              },
              {
                name: 'Craft IPA Beer',
                qty: 3,
                image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3',
                price: 9.99,
                product: '2',
              },
            ],
          },
          {
            _id: '2',
            createdAt: '2023-05-20T15:45:00Z',
            totalPrice: 63.98,
            isPaid: true,
            paidAt: '2023-05-20T15:50:00Z',
            isDelivered: true,
            deliveredAt: '2023-05-21T11:30:00Z',
            orderItems: [
              {
                name: 'Single Malt Whiskey',
                qty: 1,
                image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3',
                price: 59.99,
                product: '3',
              },
              {
                name: 'Sparkling Water',
                qty: 1,
                image: 'https://images.unsplash.com/photo-1598990386084-8af4dd12b3c4?ixlib=rb-4.0.3',
                price: 3.99,
                product: '4',
              },
            ],
          },
        ];
        
        setOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchOrders();
    }
  }, [userInfo]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-primary text-highlight py-10">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-secondary p-6 rounded text-center">
            <p className="mb-4">You haven't placed any orders yet.</p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-secondary rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h2 className="text-lg font-semibold mb-1">
                        Order #{order._id}
                      </h2>
                      <p className="text-sm text-gray-400">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="text-xl font-bold">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-700">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="mt-1 text-sm text-gray-400">
                            {item.qty} x ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            ${(item.qty * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-800 flex flex-col sm:flex-row justify-between items-center">
                  <div className="flex space-x-4 mb-3 sm:mb-0">
                    <div className="flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 ${order.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm">
                        {order.isPaid ? `Paid on ${formatDate(order.paidAt)}` : 'Not Paid'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 ${order.isDelivered ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      <span className="text-sm">
                        {order.isDelivered ? `Delivered on ${formatDate(order.deliveredAt)}` : 'Processing'}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/order/${order._id}`}
                    className="text-accent hover:text-white transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;