import React from 'react';
import '../Styles/ContactUs.css';
import { FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';
const ContactUs = () => {
  const HandleOnClick = () => {
    window.location.href = '/https://www.youtube.com/@rotaryshantiniketan6477';
  }
  const HandleInsta = () => {
    window.location.href = 'https://www.instagram.com/rac_shanthiniketan?igsh=dGs1aGpraHRhOXd2';
  }
  return (
    <div className="contact-container">
      <div className="contact-left">
        <h1>Contact Us</h1>
        <form className="contact-form">
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
          <FaInstagram className="icon instagram" onClick={HandleOnClick}/>
          <FaYoutube className="icon youtube" onClick={HandleInsta} />
        </div>
      </div>

      <p className="footer">© 2025 Rotary Club. All rights reserved.</p>
    </div>
  );
};

export default ContactUs;
