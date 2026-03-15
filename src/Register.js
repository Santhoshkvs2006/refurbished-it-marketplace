import React, { useState, useEffect } from "react";
import './Login.css';

function Register({ setUser, setPage }) {
    const [name, setName] = useState(() => sessionStorage.getItem('reg_name') || "");
    const [email, setEmail] = useState(() => sessionStorage.getItem('reg_email') || "");
    const [phone, setPhone] = useState(() => sessionStorage.getItem('reg_phone') || "");
    const [password, setPassword] = useState(() => sessionStorage.getItem('reg_password') || "");
    const [confirmPassword, setConfirmPassword] = useState(() => sessionStorage.getItem('reg_confirmPassword') || "");
    const [agreeTerms, setAgreeTerms] = useState(() => sessionStorage.getItem('reg_agreeTerms') === 'true');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [role, setRole] = useState(() => sessionStorage.getItem('reg_role') || 'user'); // user, admin, technician
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        sessionStorage.setItem('reg_name', name);
        sessionStorage.setItem('reg_email', email);
        sessionStorage.setItem('reg_phone', phone);
        sessionStorage.setItem('reg_password', password);
        sessionStorage.setItem('reg_confirmPassword', confirmPassword);
        sessionStorage.setItem('reg_agreeTerms', agreeTerms);
        sessionStorage.setItem('reg_role', role);
    }, [name, email, phone, password, confirmPassword, agreeTerms, role]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (!name || !email || !phone || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!/^[\d\+\-\s]+$/.test(phone)) {
            setError('Please enter a valid phone number.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!agreeTerms) {
            setError('You must agree to the Terms of Service to register.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, password, role })
            });

            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                throw new Error(`Server error: ${text.substring(0, 50)}...`);
            }

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setSuccessMsg(data.message || `${role.charAt(0).toUpperCase() + role.slice(1)} Registration Successful`);
            
            // Clear session storage upon successful registration
            sessionStorage.removeItem('reg_name');
            sessionStorage.removeItem('reg_email');
            sessionStorage.removeItem('reg_phone');
            sessionStorage.removeItem('reg_password');
            sessionStorage.removeItem('reg_confirmPassword');
            sessionStorage.removeItem('reg_agreeTerms');
            sessionStorage.removeItem('reg_role');

            setTimeout(() => {
                if (setPage) setPage("login");
            }, 1500);

        } catch (err) {
            setError(err.message || 'Registration failed.');
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card" style={{ maxWidth: '440px', padding: '30px' }}>
                <div className="login-header" style={{ marginBottom: '20px' }}>
                    <h2>Create an Account</h2>
                    <p>Join the RefurbX platform to get started.</p>
                </div>

                <div className="role-tabs">
                    <div 
                        className={`role-tab ${role === 'user' ? 'active' : ''}`}
                        onClick={() => setRole('user')}
                    >
                        General User
                    </div>
                    <div 
                        className={`role-tab ${role === 'admin' ? 'active' : ''}`}
                        onClick={() => setRole('admin')}
                    >
                        Administrator
                    </div>
                    <div 
                        className={`role-tab ${role === 'technician' ? 'active' : ''}`}
                        onClick={() => setRole('technician')}
                    >
                        Technician
                    </div>
                </div>

                {error && (
                    <div className="error-message" style={{ marginBottom: '16px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                    </div>
                )}
                
                {successMsg && (
                    <div className="success-message" style={{ marginBottom: '16px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        {successMsg}
                    </div>
                )}

                <form className="login-form" onSubmit={handleRegister}>
                    <div className="input-group" style={{ marginBottom: '16px' }}>
                        <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: '16px' }}>
                        <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: '16px' }}>
                        <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <input
                            type="tel"
                            className="input-field"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: '16px' }}>
                        <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-field password-input"
                            placeholder="Password (min 6 chars)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <button 
                            type="button" 
                            className="password-toggle" 
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="input-group" style={{ marginBottom: '16px' }}>
                        <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="input-field password-input"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <button 
                            type="button" 
                            className="password-toggle" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                        >
                            {showConfirmPassword ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="options-group" style={{ marginBottom: '20px' }}>
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                disabled={isLoading}
                            />
                            <span>I agree to the <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); if(setPage) setPage('terms'); }}>Terms of Service</a> & <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>Privacy Policy</a></span>
                        </label>
                    </div>

                    <button type="submit" className="login-btn" disabled={isLoading} style={{ marginBottom: '16px' }}>
                        {isLoading ? <div className="spinner"></div> : 'Create Account'}
                    </button>

                    <div className="register-link" style={{ marginTop: '0' }}>
                        Already have an account?
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            if (setPage) setPage("login");
                        }}>
                            Log In
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;