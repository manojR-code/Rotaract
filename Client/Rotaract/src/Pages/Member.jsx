import React from 'react';
import '../Styles/Member.css';
import rotaryImg from '../Images/Rotaractlogo.png';
import axios from 'axios';
import {toast,ToastContainer } from 'react-toastify';
function MemberForm() {
  const DataSubmit = async (e) => {
    e.preventDefault();
    const name = document.querySelector('#txt').value;
    const mail = document.querySelector('#email').value;
    const des = document.querySelector('#desc').value;
    const tel = document.querySelector('#tel').value;
    document.querySelector('#form').reset();
    toast.success('Your Request Has Been Sent Successfully');
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/Mails/Mail`, { subject: 'Want To Be A Member', from: mail, text: des, no: tel });
  }
  return (
    <div className="member-form-container">
      <div className="form-section">
        <h1>Want To Be A Member</h1>
        <form onSubmit={DataSubmit} id='form'>
          <div className="form-group">
            <label>Full Name :</label>
            <input id='txt' type="text" required />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input id='email' type="email" required />
          </div>

          <div className="form-group">
            <label>Contact Number :</label>
            <input id='tel' type="tel" required />
          </div>

          <div className="form-group">
            <label>About You :</label>
            <textarea id='desc' rows="4" required></textarea>
          </div>

          <button>Submit</button>
        </form>
      </div>

      <div className="image-section">
        <img src={rotaryImg} alt="Rotary" />
      </div>
    </div>
  );
}

export default MemberForm;
