import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      if (response.data.token) {
        // Store the user email and token in local storage
        localStorage.setItem('useremail', email);
        localStorage.setItem('usertoken', response.data.token);

        // Redirect to home page
        navigate('/home');
      } else {
        alert('Unsuccessful login');
      }
    } catch (error) {
      alert('Error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        Don't have an account yet?
        <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
};

export default LoginComponent;
