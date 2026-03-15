import React, { useState } from 'react';
import './Login.css';

const Login = ({ setPage, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('user'); // user, admin, technician
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (!email || !password) {
            setError('Please fill in both email and password.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
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
                throw new Error(data.message || 'Login failed');
            }

            if (setUser) setUser(data.user);
            setSuccessMsg(data.message || `${role.charAt(0).toUpperCase() + role.slice(1)} Login successful!`);
            
            // Wait 1.5s to show the beautiful success message before redirecting
            setTimeout(() => {
                if (setPage) setPage('products');
            }, 1500);

        } catch (err) {
            setError(err.message || 'Login failed.');
            setIsLoading(false); // only disable loading here so the success timer feels correct
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome to RefurbX</h2>
                    <p>Log in to access your portal</p>
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
                    <div className="error-message">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                    </div>
                )}

                {successMsg && (
                    <div className="success-message">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        {successMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="input-group">
                        <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-field password-input"
                            placeholder="Password"
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

                    <div className="options-group">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                disabled={isLoading}
                            />
                            Remember me
                        </label>
                        <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
                            Forgot Password?
                        </a>
                    </div>

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? <div className="spinner"></div> : 'Sign In'}
                    </button>
                </form>

                <div className="register-link">
                    Don't have an account?
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        if (setPage) setPage('register');
                    }}>
                        Register Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;