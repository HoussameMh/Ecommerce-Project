import { api } from './utils/api'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { showToast } from '../../utils/showToast';
import { Link } from 'react-router-dom';

import './homePage.css'
export function HomePage({refreshCart}) {
  const navigate = useNavigate()

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [starRating, setStarRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ['All Categories', 'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Personal Care', 'Sports & Outdoors', 'Toys & Games', 'Books', 'Automotive'];

  useEffect(() => {
    const getHomeData = async () => {
      try {
        let url = '/api/v1/products?';
        if (searchTerm) url += `name=${searchTerm}&`;
        if (category !== 'All Categories') url += `category=${category}&`;

        const filters = [
          `price>=${priceRange.min}`,
          `price<=${priceRange.max}`,
          `averageRating>=${starRating}`
        ];
        url += `numericFilters=${filters.join(',')}`;

        const response = await api.get(url);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error API:", error);
      }
    };
    getHomeData();
  }, [category, priceRange, starRating, searchTerm]);

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        showToast("You need to log in first", "error");
        navigate('login')
        return;
      }

      const response = await api.post(
        '/api/v1/cart/items',
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast(`${product.name} ajouté au panier !`, 'success');
      refreshCart();
      console.log("Panier mis à jour :", response.data.cart);
    } catch (error) {
      console.error("Erreur panier :", error.response?.data?.msg || "Erreur serveur");
    }
  };

  return (
    <main className="home-layout">

      <nav className="horizontal-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="main-wrapper">

        <aside className="sideBar">
          <div className="sidebar-section">
            <h4>Search</h4>
            <div className="search-input-wrapper">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Price Range</h4>
            <div className="filter-group">
              <button className={priceRange.max === 100 ? "active" : ""} onClick={() => setPriceRange({ min: 0, max: 100 })} > Under 100 MAD </button>
              <button className={priceRange.min === 100 && priceRange.max === 500 ? "active" : ""} onClick={() => setPriceRange({ min: 100, max: 500 })} > 100 - 500 MAD </button>
              <button className={priceRange.max === 50000 ? "active" : ""} onClick={() => setPriceRange({ min: 0, max: 50000 })} > All Prices </button>
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Minimum Rating</h4>
            <div className="stars-options">
              {[5, 4, 3, 2, 1].map((num) => (
                <button key={num} className={`star-btn ${starRating === num ? 'active' : ''}`} onClick={() => setStarRating(num)} > {num} Stars & Up </button>
              ))}
            </div>
          </div>
        </aside>


        <section className="products-grid">

          {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="product-card-link">
            <div className="product-card">
              <div className="product-top">

                <div className="hover-rating">
                  <i className="fa-solid fa-star"></i>
                  <span>{product.rating?.averageRating || 0}</span>
                </div>


                <div className="wishlist-icon">
                  <i className="fa-regular fa-heart"></i>
                </div>

                <img src={product.coverImage || product.imagesUrl[0]} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                <button className="addToCart-button" onClick={() => handleAddToCart(product)}>
                  <i className="fa-solid fa-cart-plus"></i>
                  <span className="price">{product.price} MAD</span>
                </button>
              </div>
            </div>          
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}