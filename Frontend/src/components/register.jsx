import React, { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validating username
    if (username.length < 5) {
      setError('Username must be at least 5 characters long.');
      return;
    }

    // Validating password
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validating email
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    // Validating phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Phone number must have exactly 11 digits.');
      return;
    }

    // If all validations pass, proceed with registration
    try {
      const response = await fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, 
          password: password,
          email: email,
          phone_number: phoneNumber,
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setError('');
      } else {
        setError(data.detail);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{11}$/.test(phoneNumber);
  };

  return (
    <form onSubmit={handleRegister} className="register-form">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`register-input ${error && error.includes('Username') && 'error'}`}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`register-input ${error && error.includes('Password') && 'error'}`}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`register-input ${error && error.includes('Password') && 'error'}`}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`register-input ${error && error.includes('email') && 'error'}`}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={`register-input ${error && error.includes('Phone number') && 'error'}`}
        />
      </div>
      <button type="submit" className="register-button">Register</button>
    </form>
  );
};

export default RegisterPage;
