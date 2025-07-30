import React, { useState } from 'react';
import ImageLogo from '/Images/Rotaract-e1690287173287.png';
import '../Styles/FrontPage.css';
import VideoPlay from '/Videos/2018_156_PowerInOurConnections_Omnibus30_NOVO_1080-v2.mp4';

function FrontPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className="Head">
        <div className="InnerSideSection">
          <img src={ImageLogo} alt="" width={120} height={120} />
          <div className="LogoSide">
            <h1>Rotaract</h1>
            <h2>Shanthiniketan</h2>
          </div>
        </div>
        <div className="HamburgerMenu" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>

        <div className={`Lists ${menuOpen ? 'show' : ''}`}>
          <ul>
            <li>About Us</li>
            <li>Our Works</li>
          </ul>
        </div>
      </div>


      <div className="HeadLine">
        <h1>ROTARACT</h1>
        <h4>CLUB OF SHANTHINIKETAN</h4>
      </div>

      {/* Video Background */}
      <div
        className="VideoPlayer"
        style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
      >
        <video
          src={VideoPlay}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          className="innerInfo"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            zIndex: 2,
            padding: '1rem',
          }}
        >
          <h1>We Are The People Of Action</h1>
          <br />
          <p>
            Backed by a community of 1000 dedicated youth leaders, we drive meaningful change
            through service, leadership, and innovation.
          </p>
          <br />
          <h2>Take Action with Us</h2>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
