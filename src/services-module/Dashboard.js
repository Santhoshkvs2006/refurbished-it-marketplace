import React, { useState } from 'react';
import './Services.css';
import { dummyProductsData } from './data';

/**
 * Dashboard Component
 * To integrate with a real DB, replace dummyProductsData imports with a fetch call
 * inside a useEffect hook.
 */
const Dashboard = ({ onProductSelect, onAddToCart }) => {
  const [category, setCategory] = useState('Laptops');
  const [showBenchmark, setShowBenchmark] = useState(null);
  const [filterWomen, setFilterWomen] = useState(false);
  
  // Filter products based on selected category and women's filter toggle
  const allProductsInCategory = dummyProductsData[category] || [];
  const filteredProducts = filterWomen 
    ? allProductsInCategory.filter(p => p.discountWomen)
    : allProductsInCategory;

  return (
    <div className="services-container">
      <div className="browse-header">
        <h2 className="section-title">EcoTech Dashboard</h2>
        <p className="section-subtitle">Browse our premium refurbished collection directly from your dashboard.</p>
        
        <div className="dashboard-controls">
          <div className="category-selector">
            {Object.keys(dummyProductsData).map(cat => (
              <button
                key={cat}
                className={`category-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="women-filter-toggle">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={filterWomen} 
                onChange={() => setFilterWomen(!filterWomen)} 
              />
              <span className="slider round"></span>
            </label>
            <span className="filter-label">
               Women in Tech & Special Discounts <span>✨</span>
            </span>
          </div>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card" onClick={() => onProductSelect(product)}>
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
              
              <div className="card-badges">
                {product.certified && (
                  <div 
                    className="certified-badge" 
                    style={{ position: 'relative', top: 'auto', right: 'auto' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBenchmark(product);
                    }}
                  >
                    <span className="badge-icon">🛡️</span> Certified
                  </div>
                )}
                {product.discountWomen && filterWomen && (
                  <div className="discount-tag">Special Price</div>
                )}
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-meta">
                <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="product-rating">★ {product.rating}</span>
              </div>
              <div className="card-actions">
                <button 
                  className="add-cart-btn" 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                >
                  Add to Cart
                </button>
                <button 
                  className="buy-now-btn" 
                  onClick={(e) => { e.stopPropagation(); onProductSelect(product); }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="no-products">
            No products found matching the criteria.
          </div>
        )}
      </div>

      {showBenchmark && (
        <div className="benchmark-overlay" onClick={() => setShowBenchmark(null)}>
          <div className="benchmark-popup" onClick={e => e.stopPropagation()}>
            <div className="benchmark-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="https://images.unsplash.com/photo-1603899122321-df6de0cda381?w=100&q=80" alt="Certificate Seal" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '50%' }} />
                <h3>Refurbishment Certificate</h3>
              </div>
              <button className="close-btn" onClick={() => setShowBenchmark(null)}>&times;</button>
            </div>
            <div className="benchmark-content">
              <div className="benchmark-item">
                <span className="check">✓</span>
                <div>
                  <strong>Hardware Diagnostic</strong>
                  <p>Comprehensive 80-point component check passed (Grade A).</p>
                </div>
              </div>
              <div className="benchmark-item">
                <span className="check">✓</span>
                <div>
                  <strong>Battery Health</strong>
                  <p>Verified above 85% original capacity.</p>
                </div>
              </div>
              <div className="benchmark-item">
                <span className="check">✓</span>
                <div>
                  <strong>Cosmetic Standard</strong>
                  <p>Minimal to no visible wear; thoroughly sanitized.</p>
                </div>
              </div>
              <div className="benchmark-item">
                <span className="check">✓</span>
                <div>
                  <strong>Warranty Backed</strong>
                  <p>6 months EcoTech comprehensive warranty included.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
