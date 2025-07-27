import React, { useState } from "react";
import "../Styles/AdminLogin.css";
import {useNavigate,Navigate } from 'react-router-dom';
const AdminLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  function Checker(e) {
    e.preventDefault();
    navigate('/AdminDashBoard');
  }
  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className="admin-login-title">Admin Login</h2>
        <form className="admin-login-form" onSubmit={Checker}>
          <div className="form-group">
            <label htmlFor="email">Name</label>
            <input type="text" id="email" placeholder="AdminName" required onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>
        <p className="footer-text">© 2025 Admin Panel. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
