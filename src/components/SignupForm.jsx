import { useState } from 'react';
import axios from 'axios';
import './SignupForm.css';

export default function SignupForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/signup', form);
      setMsg('Signup successful! You can now log in.');
    } catch (err) {
      setMsg('Signup failed. Username may already exist.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-heading">Signup</h2>
        <input className="signup-input" name="username" placeholder="Username" onChange={handleChange} required />
        <input className="signup-input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="signup-button" type="submit">Signup</button>
        {msg && <p className="signup-msg">{msg}</p>}
      </form>
    </div>
  );
}
