import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance.js';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState(null); // State for cart
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch orders
                const orderResponse = await axiosInstance.get('/order/user/items');
                setOrders(orderResponse.data);

                // Fetch cart
                const cartResponse = await axiosInstance.get('/cart/items');
                setCart(cartResponse.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load data');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <span className="loading loading-spinner loading-lg text-warning"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-red-500 text-xl">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
            <h1 className="text  text-yellow-500 font-bold mb-6 text-center">My Orders</h1>

            {/* Cart Section */}
            <div className="mb-8">
                <h2 className="text-2xl text-yellow-500 font-semibold mb-4"></h2>
                {cart && cart.items.length > 0 ? (
                    <div className="space-y-4">
                        {cart.items.map(item => (
                            item.foodId ? (
                                <div key={item._id} className="flex items-center gap-4 bg-gray-800 p-4 rounded">
                                    <img
                                        src={item.foodId.foodImage || '/default-image.jpg'}
                                        alt={item.foodId.itemName || 'Item'}
                                        className="w-16 h-16 rounded object-cover"
                                        onError={(e) => (e.target.src = '/default-image.jpg')}
                                    />
                                    <div>
                                        <p className="text-white">{item.foodId.itemName}</p>
                                        <p className="text-white">₹{item.price} x {item.quantity}</p>
                                        <p className="text-gray-400 text-sm">{item.foodId.category}</p>
                                        <p className="text-gray-400 text-sm">Restaurant ID: {item.foodId.restaurant}</p>
                                    </div>
                                </div>
                            ) : (
                                <p key={item._id} className="text-yellow-500 text-sm">Item details unavailable</p>
                            )
                        ))}
                        <p className="text-white font-semibold">Total: ₹{cart.totalPrice}</p>
                        
                    </div>
                ) : (
                    <p className="text-yellow-500"></p>
                )}
            </div>

            {/* Orders Section */}
            {orders.length === 0 ? (
                <div className="text-center text-yellow-500 text-xl">
                   
                    <Link to="/menu" className="btn btn-warning ml-4">Discover new food</Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="card bg-gray-800 shadow-xl p-6">
                            <h2 className="text-xl text-yellow-500 font-semibold">Order #{order._id.slice(-6)}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <p className="text-white"><strong>Restaurant:</strong> {order.restaurantName}</p>
                                    <p className="text-white"><strong>Total:</strong> ₹{order.totalPrice}</p>
                                    <p className="text-white"><strong>Items:</strong> {order.totalQuantity}</p>
                                    <p className="text-white"><strong>Status:</strong> {order.orderStatus}</p>
                                    <p className="text-white"><strong>Payment:</strong> {order.paymentStatus}</p>
                                    <p className="text-white"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg text-yellow-500">Items</h3>
                                    <div className="space-y-2">
                                        {order.orderItems.map(item => (
                                            item.itemNameId ? (
                                                <div key={item._id} className="flex items-center gap-4">
                                                    <img
                                                        src={item.itemNameId.foodImage || '/default-image.jpg'}
                                                        alt={item.itemNameId.itemName || 'Item'}
                                                        className="w-16 h-16 rounded object-cover"
                                                        onError={(e) => (e.target.src = '/default-image.jpg')}
                                                    />
                                                    <div>
                                                        <p className="text-white">{item.itemNameId.itemName || 'Unknown Item'}</p>
                                                        <p className="text-white">₹{item.price} x {item.quantity}</p>
                                                        <p className="text-gray-400 text-sm">{item.itemNameId.category || 'Unknown Category'}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div key={item._id} className="text-yellow-500 text-sm">
                                                    Item details unavailable
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-right">
                                <Link to={`/orders/${order._id}`} className="btn btn-warning">View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Order;