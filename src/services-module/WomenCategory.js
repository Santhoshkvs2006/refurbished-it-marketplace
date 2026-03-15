import React, { useState } from 'react';
import './Services.css';
import { dummyProductsData } from './data';

const WomenCategory = ({ onProductSelect, onAddToCart }) => {
  const [showBenchmark, setShowBenchmark] = useState(null);

  const initiatives = [
    {
      id: 1,
      title: 'Women in Tech Discount',
      description: 'Exclusive 15% discount on all laptop purchases and repairs for female professionals and students.',
      icon: '💻'
    },
    {
      id: 2,
      title: 'Free Basic Diagnostics',
      description: 'Zero fee for initial device health checks to ensure your technology never holds you back.',
      icon: '🔧'
    },
    {
      id: 3,
      title: 'Empowerment Accessories',
      description: 'Curated collection of smartwatches and safety devices designed specifically for women.',
      icon: '⌚'
    }
  ];

  // Flatten products and filter those marked for women discount
  const allProducts = Object.values(dummyProductsData).flat();
  const empowermentProducts = allProducts.filter(p => p.discountWomen);

  return (
    <div className="services-container">
      <div className="service-header">
        <h2>Women Empowerment Category</h2>
        <p>Special initiatives, discounts, and curated products exclusively for women.</p>
      </div>

      <div className="banner" style={{ marginBottom: '40px' }}>
        <h2>🌟 Welcome to the Dedicated Portal 🌟</h2>
        <p>We believe in breaking barriers. Explore services tailored to support women in technology and everyday life.</p>
      </div>

      <div className="product-grid" style={{ marginBottom: '50px' }}>
        {initiatives.map((item) => (
          <div key={item.id} className="product-card" style={{padding: '20px', alignItems: 'center', textAlign: 'center'}}>
            <div className="product-icon" style={{fontSize: '40px', marginBottom: '15px'}}>{item.icon}</div>
            <h3 style={{marginBottom: '10px'}}>{item.title}</h3>
            <p style={{color: '#666'}}>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="service-header" style={{ textAlign: 'left', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', borderBottom: '2px solid #10b981', display: 'inline-block', paddingBottom: '10px' }}>Empowerment Collection (Extra 15% Off)</h2>
        <p>Browse our exclusively curated gadgets with automatic discounts applied.</p>
      </div>

      <div className="products-grid">
        {empowermentProducts.map(product => (
          <div key={product.id} className="product-card" onClick={() => onProductSelect && onProductSelect(product)}>
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
                <div className="discount-tag" style={{ background: '#ec4899', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                  Women in Tech -15%
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-name" style={{ marginBottom: '8px' }}>{product.name}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px', lineHeight: '1.4' }}>
                Reliable technology empowering women to lead, create, and break barriers in the modern workplace.
              </p>
              <div className="product-meta">
                <span className="product-price">
                  ₹{Math.floor(product.price * 0.85).toLocaleString('en-IN')} 
                  <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '14px', marginLeft: '8px' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </span>
                <span className="product-rating">★ {product.rating}</span>
              </div>
              <div className="card-actions">
                <button 
                  className="add-cart-btn" 
                  onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(product); }}
                >
                  Add to Cart
                </button>
                <button 
                  className="buy-now-btn" 
                  onClick={(e) => { e.stopPropagation(); onProductSelect && onProductSelect(product); }}
                  style={{ background: '#ec4899' }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
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

export default WomenCategory;
