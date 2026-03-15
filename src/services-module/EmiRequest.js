import React, { useState } from 'react';
import './Services.css';

const EmiRequest = () => {
  const [formData, setFormData] = useState({
    productId: '',
    months: '3', // Default 3 months
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock API Call: POST /emiRequest
    const payload = {
      userId: 'mock_student_456', // Real app gets this from Auth
      productId: formData.productId,
      months: parseInt(formData.months, 10),
      status: 'Pending Approval',
      requestDate: new Date().toISOString()
    };

    console.log('Sending POST request to /emiRequest:', payload);
    
    // Simulate API Response 
    alert(`EMI Request submitted successfully for Product Reference: ${formData.productId}.\nMonths: ${formData.months}\n\nOur team will review your application soon!`);
    
    // Reset form
    setFormData({ productId: '', months: '3' });
  };

  return (
    <div className="services-container">
      <div className="service-card">
        <div className="service-header">
          <h2>Student EMI Request Form</h2>
          <p>Easy financing options exclusively for verified students.</p>
        </div>

        <form className="service-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="productId">Product / Purchase Reference ID</label>
            <input
              type="text"
              id="productId"
              name="productId"
              className="form-input"
              placeholder="e.g. PROD-123456"
              value={formData.productId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="months">EMI Tenure (Months)</label>
            <select
              id="months"
              name="months"
              className="form-select"
              value={formData.months}
              onChange={handleChange}
              required
            >
              <option value="3">3 Months (Interest Free)</option>
              <option value="6">6 Months</option>
              <option value="9">9 Months</option>
              <option value="12">12 Months</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={!formData.productId.trim()}>
            Submit EMI Request
          </button>
        </form>

      </div>
    </div>
  );
};

export default EmiRequest;
