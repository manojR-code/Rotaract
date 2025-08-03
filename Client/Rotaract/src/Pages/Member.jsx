import React from 'react';
import '../Styles/Member.css';
 import rotaryImg from '../Images/Rotaractlogo.png';

function MemberForm() {
  return (
    <div className="member-form-container">
      <div className="form-section">
        <h1>Want To Be A Member</h1>
        <form>
          <div className="form-group">
            <label>Full Name :</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Email :</label>
            <input type="email" required />
          </div>

          <div className="form-group">
            <label>Contact Number :</label>
            <input type="tel" required />
          </div>

          <div className="form-group">
            <label>About You :</label>
            <textarea rows="4" required></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="image-section">
        <img src={rotaryImg} alt="Rotary" />
      </div>
    </div>
  );
}

export default MemberForm;
