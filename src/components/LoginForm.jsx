import { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/login', form);
      window.location.href = 'http://localhost:5173/admin';
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-heading">Login</h2>
        <input className="login-input" name="username" placeholder="Username" onChange={handleChange} required />
        <input className="login-input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="login-button" type="submit">Login</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}
