import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'
import '../Styles/GetToKnow.css'
import teju from '/Images/teju_sanatani-20250725-0001.jpg'
function GetToKnow(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/Members`);
        setUsers(res.data.Users || []);
      } catch (err) {
        toast.error('Something Went Wrong');
      }
    }
    fetcher();
  }, []);
  const boxVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  const animationProps = {
    variants: boxVariants,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5 },
  };
  const containerimagestyle = {
    with: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '50px'
  }
  const BlocksContainer = {
    marginTop: '50px',
    width: '300px',
    height: '400px',
    backgroundColor: 'white',
    borderRadius: '10px',
    objectFit: 'contain',
  }
  console.log(users);
  const fun = (bufferArray) => {
    try {
      const uint8Array = new Uint8Array(bufferArray);
      const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
      return btoa(binaryString);
    } catch (err) {
      console.error('Image decode error:', err);
      return null;
    }
  };
  return (
    <>
      <div className="temp">
        <h2>Get To Know Team</h2>
      </div>
      <div className="containerimage" style={{ ...containerimagestyle }}>
        {users && users.map((user, index) => (
          <motion.div
            key={user._id || index}
            className="blocks"
            style={BlocksContainer}
            {...animationProps}
          >
            <div className="images">
              <img
                src={`data:image/jpeg;base64,${fun(user.Imgae_Upload.data)}`}
                alt={user.Name}
              />
            </div>
            <div className="info">
              <h2>{user.Role}</h2>
              <h3>{user.Name}</h3>
            </div>
          </motion.div>
        ))}

      </div>
      <div className="btn">
        <h3>Know Our Team</h3>
      </div>
    </>
  );
}

export default GetToKnow;