import React, { useState } from 'react';
import './Services.css';
import { mockOrders } from './data';

const RepairService = ({ onBack }) => {
  const [step, setStep] = useState(1); 
  const [status, setStatus] = useState('idle'); 
  
  const [formData, setFormData] = useState({
    selectedProduct: '',
    externalProductName: '',
    problem: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const resetFlow = () => {
    setStep(1);
    setStatus('idle');
    setFormData({ selectedProduct: '', externalProductName: '', problem: '' });
  };

  if (status === 'success') {
    return (
      <div className="services-container animate-fade-in">
        <div className="success-inline-card">
          <div className="success-icon-bg">✓</div>
          <h2>Request Submitted!</h2>
          <p>Your repair request has been successfully logged. Our technician will contact you within 24 hours.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="submit-btn" onClick={resetFlow}>Submit Another</button>
            <button className="submit-btn" style={{ backgroundColor: '#64748b' }} onClick={onBack}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="services-container">
      <button className="back-btn" onClick={onBack} style={{ margin: '0 0 20px 0' }}>
        <span className="back-icon">&larr;</span> Back to Dashboard
      </button>

      <div className="repair-header">
        <h2 className="section-title">Repair Service Center</h2>
        <p className="section-subtitle">Get your devices fixed by certified EcoTech professionals.</p>
      </div>

      <div className="repair-flow-container">
        {step === 1 && (
          <div className="choice-container animate-fade-in">
            <h3>Is this a product bought from EcoTech?</h3>
            <div className="choice-cards">
              <div className="choice-card" onClick={() => setStep(2)}>
                <div className="choice-icon">🏪</div>
                <h4>Yes, it's an EcoTech Product</h4>
                <p>Select from your previous orders for faster processing.</p>
              </div>
              <div className="choice-card" onClick={() => setStep(3)}>
                <div className="choice-icon">🔌</div>
                <h4>No, it's my own Product</h4>
                <p>Provide details of your device for a service quote.</p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-container animate-fade-in">
            <button className="back-link" onClick={() => setStep(1)}>&larr; Change Selection</button>
            <h3>Select a Product from your Orders</h3>
            <div className="orders-list">
              {mockOrders.map(order => (
                <div 
                  key={order.id} 
                  className={`order-item ${formData.selectedProduct === order.id ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, selectedProduct: order.id})}
                >
                  <div className="order-info">
                    <strong>{order.name}</strong>
                    <span>Order ID: {order.id} • Purchased on {order.date}</span>
                  </div>
                  <div className="order-check">{formData.selectedProduct === order.id ? '✓' : ''}</div>
                </div>
              ))}
            </div>
            
            <form className="service-form" onSubmit={handleSubmit}>
               <div className="form-group" style={{marginTop: '20px'}}>
                  <label>Describe the Problem</label>
                  <textarea 
                    className="form-textarea"
                    placeholder="e.g. Broken screen, battery issue..."
                    value={formData.problem}
                    onChange={(e) => setFormData({...formData, problem: e.target.value})}
                    required
                  />
               </div>
               <button type="submit" className="submit-btn" disabled={!formData.selectedProduct || !formData.problem}>
                 {status === 'submitting' ? 'Submitting...' : 'Submit Repair Request'}
               </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="step-container animate-fade-in">
            <button className="back-link" onClick={() => setStep(1)}>&larr; Change Selection</button>
            <h3>External Product Details</h3>
            <form className="service-form" onSubmit={handleSubmit}>
               <div className="form-group">
                  <label>Product Name / Model</label>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="e.g. Sony TV 55', Custom built PC..."
                    value={formData.externalProductName}
                    onChange={(e) => setFormData({...formData, externalProductName: e.target.value})}
                    required
                  />
               </div>
               <div className="form-group">
                  <label>Describe the Problem</label>
                  <textarea 
                    className="form-textarea"
                    placeholder="Please explain the issue..."
                    value={formData.problem}
                    onChange={(e) => setFormData({...formData, problem: e.target.value})}
                    required
                  />
               </div>
               <button type="submit" className="submit-btn" disabled={!formData.externalProductName || !formData.problem}>
                 {status === 'submitting' ? 'Submitting...' : 'Submit Repair Request'}
               </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairService;
