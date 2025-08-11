import React from 'react';
import '../Styles/ContactUs.css';
import { FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import axios from 'axios';
const ContactUs = () => {
  const HandleOnClick = () => {
    window.open('http://www.youtube.com/@rotaryshantiniketan6477');
  }
  const HandleInsta = () => {
    window.location.href = 'https://www.instagram.com/rac_shanthiniketan?igsh=dGs1aGpraHRhOXd2';
  }
  const handleSubmit = (e) => { 
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const enquiry = e.target[2].value;
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/Mails/Contact`, { fullName: name, email, enquiry })
    e.target.reset();
  }
  return (
    <div className="contact-container">
      <div className="contact-left">
        <h1>Contact Us</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Full Name :</label>
          <input type="text" />

          <label>Email :</label>
          <input type="email" />

          <label>Enquiry About :</label>
          <input type="text" />

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="contact-right">
        <p>You Can Connect With Us on</p>
        <div className="social-icons">
          <FaInstagram className="icon instagram" onClick={HandleInsta}/>
          <FaYoutube className="icon youtube" onClick={HandleOnClick} />
        </div>
      </div>

      <p className="footer">© 2025 Rotary Club. All rights reserved.</p>
    </div>
  );
};

export default ContactUs;
