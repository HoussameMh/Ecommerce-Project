import { useEffect, useState } from 'react';
import { api } from './utils/api'
import './ordersPage.css'

export function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      const res = await api.get('/api/v1/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data.orders);
    };
    fetchOrders();
  }, []);

  return (
    <main className="orders-wrapper">
      <h2>My Orders ({orders.length})</h2>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <p>Order ID: {order._id.substring(0, 8)}...</p>
              <span className={`status ${order.status}`}>{order.status}</span>
            </div>
            <div className="order-items">
              {order.orderItems.map(item => (
                <p key={item.product}>{item.quantity}x {item.name}</p>
              ))}
            </div>
            <p className="total-price">Total: {order.total} MAD</p>
          </div>
        ))}
      </div>
    </main>
  );
}