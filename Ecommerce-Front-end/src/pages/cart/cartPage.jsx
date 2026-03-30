import api from '../../utils/api'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router'; 
import { showToast } from '../../utils/showToast';
import './cartPage.css';

export function CartPage({ refreshCount }) {
  const navigate = useNavigate();
  const SHIPPING_FEE = 15; 
  const [cart, setCart] = useState(null);

 
  const fetchFullCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/api/v1/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.cart);
    } catch (error) {
      console.error("cart error:", error);
    };
  };

  useEffect(() => {
    fetchFullCart();
  }, []);

  const updateQty = async (productId, newQty) => {
    if (newQty < 1) return; 
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/api/v1/cart/items/${productId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFullCart();
      refreshCount();
    } catch (error) {
      console.error(error);
    }
  };

  
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/api/v1/cart/items/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFullCart();
      refreshCount();
      showToast("Item removed", "success");
    } catch (error) {
      console.error(error);
    }
  };


  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.delete('/api/v1/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFullCart();
      refreshCount();
      showToast("Cart cleared", "success");
    } catch (error) {
      console.error(error);
    }
  };

 
  if (!cart) {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-loading">Loading Nova Cart...</div>
      </div>
    );
  }

  return (
    <main className="cart-page-wrapper">
      <div className="cart-container">
        <div className="cartCard">
          <h2 className="cart-title">
            Cart <span className="total-product">({cart.items.length} products)</span>
            {cart.items.length > 0 && (
              <span className="clear-btn" onClick={clearCart}>
                <i className="fa-solid fa-xmark"></i> CLEAR CART
              </span>
            )}
          </h2>

          {cart.items.length === 0 ? (
            <div className="empty-cart-container">
              <div className="empty-icon">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <button className="shop-now-btn" onClick={() => navigate('/')}>
                Go Shopping
              </button>
            </div>
          ) : (
            <div className="products-card">
              <div className="columns-title">
                <h3 className="column-title">Products</h3>
                <h3 className="column-title">Count</h3>
                <h3 className="column-title">Price</h3>
              </div>

              {cart.items.map((item) => (
                <div key={item.product._id} className="product-card">
                  <div className="product-infos">
                    <div className="product-img">
                      <img src={item.product.coverImage} alt={item.product.name} />
                    </div>
                    <div className="product-details">
                      <p className="product-name">{item.product.name}</p>
                      <p className="product-category">{item.product.category}</p>
                    </div>
                  </div>

                  <div className="count-controll">
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.product._id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item.product._id, item.quantity + 1)}>+</button>
                    </div>
                  </div>

                  <div className="price">
                    <p className="item-price">{item.product.price} MAD</p>
                    <button className="remove-btn" onClick={() => removeItem(item.product._id)}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="summary-container">
          <div className="summary-details">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{cart.subTotalCents} MAD</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{cart.items.length > 0 ? SHIPPING_FEE : 0} MAD</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>
                {cart.items.length > 0 ? cart.subTotalCents + SHIPPING_FEE : 0} MAD
              </span>
            </div>
            <button 
              className="checkout-btn" 
              disabled={cart.items.length === 0}
              style={{ opacity: cart.items.length === 0 ? 0.5 : 1 }}
              onClick={() => navigate('/checkout')}
            >
              Continue to checkout
            </button>
          </div>
        </aside>

      </div>
    </main>
  );
}