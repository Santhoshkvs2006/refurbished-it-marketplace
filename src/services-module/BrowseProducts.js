import React, { useState } from 'react';
import './Services.css';
import { dummyProductsData } from './data';

const BrowseProducts = ({ onProductSelect, onAddToCart, searchQuery = "" }) => {
  const [showBenchmark, setShowBenchmark] = useState(null);
  
  // Flatten all products from all categories into a single array
  const allProducts = Object.values(dummyProductsData).flat();
  
  // Filter based on the global search query
  const products = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.price.toString().includes(searchQuery)
  );

  return (
    <div className="services-container">
      {/* Search info text for user feedback */}
      {searchQuery && (
        <div style={{ marginBottom: '20px', color: '#64748b', fontSize: '16px' }}>
          Showing results for: <strong>"{searchQuery}"</strong>
        </div>
      )}

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => onProductSelect(product)}>
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
              {product.certified && (
                <div 
                  className="certified-badge" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBenchmark(product);
                  }}
                >
                  <span className="badge-icon">🛡️</span> Certified
                </div>
              )}
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
        {products.length === 0 && (
          <div className="no-products">
            No products match your search. Try looking for "MacBook" or "Dell".
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

export default BrowseProducts;
