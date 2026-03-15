import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import './Services.css';

const PaymentMethod = ({ product, amount, method, onBack, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setSuccess(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
        zIndex: 10000
      });

      setTimeout(() => {
        onSuccess();
      }, 4000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="product-details-container animate-fade-in">
        <div className="success-inline-card">
          <div className="success-icon-bg">✓</div>
          <h2>Payment Successful!</h2>
          <p>Your order for <strong>{product?.name}</strong> has been confirmed.</p>
          <p className="redirect-msg">Redirecting back to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-container animate-fade-in">
      <button className="back-btn" onClick={onBack} style={{ marginBottom: '20px' }}>
        <span className="back-icon">&larr;</span> Back to Product
      </button>

      <div className="product-details-content" style={{ maxWidth: '500px', margin: '0 auto', display: 'block', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#111827' }}>Secure Checkout</h2>
        
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#475569' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 600, color: '#1e293b' }}>{product?.name}</span>
            <strong style={{ color: '#2563eb' }}>₹{amount}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '12px', fontSize: '14px' }}>
            <span style={{ color: '#64748b' }}>Payment Method</span>
            <strong style={{ color: '#1e293b' }}>{method === 'emi' ? 'EMI Payment' : 'Pay in Full'}</strong>
          </div>
        </div>

        <form onSubmit={handlePay} className="purchase-form">
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>Card Number</label>
            <input type="text" className="form-input" placeholder="XXXX XXXX XXXX XXXX" required />
          </div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Expiry Date</label>
              <input type="text" className="form-input" placeholder="MM/YY" required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>CVV</label>
              <input type="password" className="form-input" placeholder="XXX" required maxLength="3" />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '25px' }}>
            <button type="submit" className="buy-btn submit-btn" disabled={isProcessing} style={{ width: '100%', background: '#10b981', border: 'none', color: 'white', padding: '16px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' }}>
              {isProcessing ? 'Processing Payment...' : `Pay ₹${amount} Now`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
