import { useState } from 'react';
import { api } from './utils/api'
import { useNavigate } from 'react-router';
import { showToast } from '../../utils/showToast';
import './checkoutPage.css';

export function CheckoutPage({ refreshCount }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zipCode: '',
    country: 'Morocco'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/api/v1/orders', address, {
        headers: { Authorization: `Bearer ${token}` }
      });

      showToast("Order placed successfully! 🚀", "success");
      refreshCount(); 
      navigate('/orders'); 
    } catch (error) {
      showToast(error.response?.data?.msg || "Error creating order", "error");
    }
  };

  return (
    <main className="checkout-wrapper">
      <div className="checkout-card">
        <h2>Shipping Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Street Address</label>
            <input 
              type="text" required placeholder="Avenue Allal El Fassi..."
              value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})}
            />
          </div>
          
          <div className="row">
            <div className="input-group">
              <label>City</label>
              <input 
                type="text" required placeholder="Rabat"
                value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>Zip Code</label>
              <input 
                type="number" required placeholder="10000"
                value={address.zipCode} onChange={(e) => setAddress({...address, zipCode: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Country</label>
            <input type="text" value={address.country} disabled />
          </div>

          <button type="submit" className="confirm-btn">Confirm Order</button>
        </form>
      </div>
    </main>
  );
}