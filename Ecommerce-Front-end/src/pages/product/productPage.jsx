import api from '../../utils/api'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showToast } from '../../utils/showToast';
import './productPage.css';

export function ProductPage({ refreshCount }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await api.get(`/api/v1/products/${id}`);
        setProduct(productRes.data.product);
        setMainImage(productRes.data.product.coverImage);

        const reviewsRes = await api.get(`/api/v1/reviews/product/${id}`);
        setReviews(reviewsRes.data.reviews);
      } catch (error) {
        console.error(error);
        showToast("Error fetching product data", "error");
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return showToast("Please login first", "error");

      await api.post('/api/v1/cart/items',
        { productId: id, quantity: quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast("Added to cart! 🛒", "success");
      refreshCount();
    } catch (error) {
      showToast(error.response?.data?.msg || "Error adding to cart", "error");
    }
  };

  const calculateBarWidth = (rating) => {
    if (reviews.length === 0) return '0%';
    const count = reviews.filter(r => r.rating === rating).length;
    return `${(count / reviews.length) * 100}%`;
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return showToast("Please login to leave a review", "error");

      await api.post('/api/v1/reviews',
        { productId: id, rating: newRating, comment: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast("Review added! Thank you.", "success");
      setNewComment('');
      setNewRating(5);

      const reviewsRes = await api.get(`/api/v1/reviews/product/${id}`);
      setReviews(reviewsRes.data.reviews);
    } catch (error) {
      showToast(error.response?.data?.msg || "Error adding review", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return <div className="loading">Loading Nova Product...</div>;

  return (
    <main className="product-page-wrapper">
      <nav className="breadcrumbs">
        Home / {product.category} / {product.name}
      </nav>

      <div className="product-top-section">
        <section className="product-gallery">
          <div className="main-image-container">
            <img src={mainImage} alt={product.name} />
          </div>
          <div className="thumbnails-row">
            {[product.coverImage, ...(product.imagesUrl || [])].map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`view-${index}`} />
              </div>
            ))}
          </div>
        </section>

        <section className="product-info-panel">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-meta">
            <div className="rating-badge">
              <i className="fa-solid fa-star"></i>
              <span>{product.rating?.averageRating || 0}</span>
            </div>
            <span className="reviews-link">({product.rating?.numReviews || 0} reviews)</span>
            <span className={`stock-tag ${product.stock > 0 ? 'in' : 'out'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="price-tag">{product.price} MAD</div>

          <p className="short-desc">{product.description?.substring(0, 250)}...</p>

          <div className="actions-row">
            <div className="qty-picker">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button className="add-btn" onClick={handleAddToCart} disabled={product.stock === 0}>
              <i className="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
          </div>

          <button className="buy-btn">Buy this item</button>

          <div className="product-footer-links">
            <span><i className="fa-regular fa-comment"></i> Chat</span>
            <span><i className="fa-regular fa-heart"></i> Wishlist</span>
            <span><i className="fa-solid fa-share-nodes"></i> Share</span>
          </div>
        </section>
      </div>

      <section className="product-tabs-section">
        <div className="tabs-nav">
          <button className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>Details</button>
          <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews</button>
          <button className={activeTab === 'video' ? 'active' : ''} onClick={() => setActiveTab('video')}>Video</button>
        </div>

        <div className="tabs-body">
          {activeTab === 'details' && <div className="details-tab"><p>{product.description}</p></div>}

          {activeTab === 'reviews' && (
            <div className="reviews-tab">

              <div className="add-review-section">
                <h3>Write a Review</h3>
                <form onSubmit={handleAddReview}>
                  <div className="star-picker">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={star <= newRating ? "fa-solid fa-star" : "fa-regular fa-star"}
                        onClick={() => setNewRating(star)}
                      ></i>
                    ))}
                  </div>
                  <textarea
                    placeholder="What did you think about this product?"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  ></textarea>
                  <button type="submit" disabled={isSubmitting} className="submit-review-btn">
                    {isSubmitting ? "Posting..." : "Post Review"}
                  </button>
                </form>
              </div>
              
              <div className="reviews-grid">
                <div className="rating-stats">
                  <h3>{product.rating?.averageRating || 0}</h3>
                  <div className="rating-bars">
                    {[5, 4, 3, 2, 1].map(num => (
                      <div key={num} className="bar-row">
                        <span>{num}</span>
                        <div className="bar-bg"><div className="bar-fill" style={{ width: calculateBarWidth(num) }}></div></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="comments-list">
                  {reviews.length > 0 ? (
                    reviews.map((rev) => (
                      <div key={rev._id} className="comment-item">
                        <div className="comment-header">
                          <p className="comment-user">{rev.user?.firstName} {rev.user?.lastName}</p>
                          <div className="comment-stars">
                            {[...Array(rev.rating)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                          </div>
                        </div>
                        <p className="comment-text">{rev.comment}</p>
                      </div>
                    ))
                  ) : <p className="no-reviews">No reviews yet.</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="video-tab">
              {product.videoUrl ? (
                <iframe width="100%" height="500" src={product.videoUrl.replace("watch?v=", "embed/")} title="video" frameBorder="0" allowFullScreen></iframe>
              ) : <p>No video available.</p>}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}