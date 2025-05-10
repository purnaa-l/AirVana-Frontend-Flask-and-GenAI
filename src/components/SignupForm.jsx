import { useState } from 'react';
import axios from 'axios';
import './SignupForm.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SignupForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMsg('Passwords do not match.');
      return;
    }
  
    try {
      await axios.post('http://localhost:8080/api/auth/signup', form);
      setMsg('Signup successful! You can now log in.');
      toast.success('Signup successful! You can now log in.')
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error('Email already in use or username already taken.');
        setMsg('Email already in use or username already taken.');
      }
    }
  };
  
    

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-heading">Signup</h2>
        <input className="signup-input" name="username" placeholder="Username" onChange={handleChange} required />
        <input className="signup-input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input className="signup-input" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
        <input className="signup-input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <button className="signup-button" type="submit">Signup</button>
        {msg && <p className="signup-msg">{msg}</p>}
        <ToastContainer />
         {/* Footer */}
      <footer className="footer-text">
        Already have an account? 
        <a href="/login" className="contact-link"> Login Now!</a>
      </footer>
    
      </form>
    </div>
  );
}
