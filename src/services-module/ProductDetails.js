import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import './Services.css';
import { mockReviews } from './data';

const ProductDetails = ({ product, onBack, onAddToCart, onBuyNow }) => {
  const [emiMonths, setEmiMonths] = useState('3');
  const [isPurchased, setIsPurchased] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('full'); // 'full' or 'emi'
  const [purchaseAmount, setPurchaseAmount] = useState(product?.price || '');
  
  const [reviews, setReviews] = useState(mockReviews);
  const [newReview, setNewReview] = useState({ author: '', rating: '5', comment: '' });

  if (!product) return null;

  const handlePurchase = (e) => {
    e.preventDefault();
    if (onBuyNow) {
      onBuyNow(purchaseAmount, paymentMethod);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;
    
    const reviewToAdd = {
      id: reviews.length + 1,
      author: newReview.author,
      rating: parseInt(newReview.rating),
      comment: newReview.comment,
      date: 'Just now'
    };
    
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ author: '', rating: '5', comment: '' });
  };

  return (
    <div className="product-details-container">
      <button className="back-btn" onClick={onBack}>
        <span className="back-icon">&larr;</span> Back to Dashboard
      </button>
      
      <div className="product-details-content">
        <div className="product-media">
          <img src={product.image} alt={product.name} className="product-detail-image" />
          {product.certified && (
            <div className="certified-tag-large">
              🛡️ Certified Refurbished
            </div>
          )}
        </div>
        
        <div className="product-info-panel">
          <h2 className="product-title">{product.name}</h2>
          <div className="product-meta-large">
            <span className="price-tag">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="rating-tag">★ {product.rating}</span>
          </div>
          
          <div className="product-specs">
            <h3>Refurbished Specifications</h3>
            <ul>
              <li>Professional grading (EcoTech Verified)</li>
              <li>6 Month Store Warranty</li>
              <li>Genuine Accessories included</li>
              <li>Eco-friendly refurbished packaging</li>
            </ul>
          </div>
          
          <div className="purchase-section">
            <div className="payment-toggle">
              <button 
                className={`toggle-btn ${paymentMethod === 'full' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('full')}
              >
                Pay in Full
              </button>
              <button 
                className={`toggle-btn ${paymentMethod === 'emi' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('emi')}
              >
                Student EMI
              </button>
            </div>

            <form onSubmit={handlePurchase} className="purchase-form">
              <div className="form-group">
                <label>Amount (₹)</label>
                <input 
                  type="text" 
                  value={purchaseAmount} 
                  className="form-input"
                  readOnly
                  style={{ backgroundColor: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }}
                />
              </div>
              
              {paymentMethod === 'emi' && (
                <div className="form-group animate-fade-in">
                  <label>EMI Tenure (Months)</label>
                  <select
                    value={emiMonths}
                    onChange={(e) => setEmiMonths(e.target.value)}
                    className="form-select"
                  >
                    <option value="3">3 Months (Interest Free)</option>
                    <option value="6">6 Months</option>
                    <option value="9">9 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="add-cart-btn-large" onClick={() => onAddToCart(product)} style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#2563eb', border: '1px solid #cce0ff' }}>
                  🛒 Add to Cart
                </button>
                <button type="submit" className="buy-btn submit-btn" disabled={isPurchased} style={{ flex: 1, backgroundColor: '#10b981', color: 'white' }}>
                  Buy Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        
        <div className="write-review-card">
          <h4>Leave a Review</h4>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="form-row">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={newReview.author}
                onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                required
              />
              <select 
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <textarea 
              placeholder="What do you think about this product?"
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              required
            ></textarea>
            <button type="submit" className="review-submit-btn">Post Review</button>
          </form>
        </div>

        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <strong>{review.author}</strong>
                  <span className="review-date">{review.date}</span>
                </div>
                <span className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
