import React from 'react';
import './Login.css';

function Terms({ setPage }) {
    return (
        <div className="login-container">
            <div className="login-card" style={{ maxWidth: '800px', padding: '40px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="login-header" style={{ marginBottom: '30px', textAlign: 'left' }}>
                    <h2>Terms and Conditions – RefurbX</h2>
                    <p>Last Updated: March 2026</p>
                </div>
                
                <div className="terms-content" style={{ textAlign: 'left', lineHeight: '1.6', color: '#4a5568', fontSize: '15px' }}>
                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>1. Definitions</h3>
                    <p><strong>“RefurbX Platform”</strong> means the online marketplace website that connects suppliers of surplus IT equipment with users seeking affordable refurbished devices, repair services, and rental options.</p>
                    <p><strong>“Refurbished Product”</strong> means previously used IT equipment such as laptops, desktops, printers, monitors, or other electronic devices that have been inspected, tested, repaired if necessary, and made available for resale on the platform.</p>
                    <p><strong>“User”</strong> means any individual who accesses, browses, registers, purchases, rents, or requests services through the RefurbX website.</p>
                    <p><strong>“Supplier”</strong> means government organizations, private companies, educational institutions, or individuals that provide surplus IT equipment to be refurbished and listed on the platform.</p>
                    <p><strong>“Technician”</strong> means a registered service provider who offers repair or maintenance services through the platform.</p>
                    <p><strong>“E-Waste Impact Score”</strong> means an estimated environmental indicator displayed on product listings showing the amount of electronic waste reduced by reusing a refurbished device.</p>
                    <p><strong>“Refurbishment Certificate”</strong> means the verification provided by technicians confirming that the device has undergone testing and basic quality inspection.</p>
                    <p><strong>“Device Rental Service”</strong> means the feature that allows users to rent devices for a limited time instead of purchasing them.</p>
                    <p><strong>“Security Deposit”</strong> means a refundable amount paid by the user before renting a device to ensure the safe return of the equipment.</p>
                    <p><strong>“EMI Service”</strong> means installment-based payment options offered through financial service partners that allow users to purchase devices through scheduled payments.</p>

                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>2. Use of the Platform</h3>
                    <p>Users must provide accurate information when creating an account or making a transaction. Any misuse, fraudulent activity, or violation of these terms may result in suspension or termination of the user account.</p>

                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>3. Product Condition and Availability</h3>
                    <p>All products listed on the platform are refurbished or previously used devices. Minor cosmetic wear may be present. Product specifications and availability may change depending on supplier inventory.</p>

                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>4. Device Rental and Security Policy</h3>
                    <p>Users renting devices must provide valid identification and pay a security deposit before receiving the device. The deposit will be refunded once the device is returned in proper condition.</p>
                    <p>If the device is damaged, lost, or not returned within the rental period, the security deposit may be used to cover repair costs or replacement value.</p>
                    <p>Late return penalties may apply if the device is returned after the agreed rental period.</p>

                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>5. Repair and Service Requests</h3>
                    <p>Users may request repair or maintenance services through registered technicians. RefurbX acts only as a platform connecting users and technicians and is not directly responsible for the service provided.</p>

                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>6. EMI Payment Terms</h3>
                    <p>Devices purchased through EMI are subject to approval by the partnered financial service provider. Users must comply with the terms and payment schedules defined by the financial partner.</p>

                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>7. Environmental Responsibility</h3>
                    <p>The platform promotes sustainability by encouraging the reuse of electronic devices. The E-Waste Impact Score shown on products represents an approximate environmental benefit and is intended to raise awareness of responsible technology usage.</p>

                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>8. Women Empowerment Category</h3>
                    <p>The platform may include a special category designed to support women professionals, entrepreneurs, and students by providing access to affordable technology. Availability of products in this category depends on supplier inventory.</p>

                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>9. Limitation of Liability</h3>
                    <p>RefurbX shall not be held responsible for indirect damages, misuse of devices, or issues arising from third-party services such as payment gateways or technician services.</p>

                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>10. Changes to Terms</h3>
                    <p>RefurbX reserves the right to modify these Terms and Conditions at any time. Updated terms will be posted on the website and continued use of the platform indicates acceptance of the revised terms.</p>

                    <h3 style={{ color: '#2d3748', marginTop: '24px', marginBottom: '12px' }}>11. Contact Information</h3>
                    <p>For any questions regarding these Terms and Conditions, users may contact the RefurbX support team through the website contact section.</p>
                    <p><strong>Contact No:</strong> 9952585794, 7985226310</p>
                </div>
                
                <div style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <button 
                        className="login-btn" 
                        style={{ maxWidth: '200px' }}
                        onClick={() => {
                            if (setPage) setPage('register');
                        }}
                    >
                        Back to Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Terms;
