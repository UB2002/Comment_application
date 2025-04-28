import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await handleRegister(email, password);
      navigate('/'); // Navigate after successful registration
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form">
        <h2 className="form-title">Create Account</h2>
        <p className="form-subtitle">Sign up to join the conversation</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Create a password" 
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            id="confirmPassword"
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm your password" 
            required
          />
        </div>
        
        <button type="submit" className="login-button">Sign Up</button>
        
        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;