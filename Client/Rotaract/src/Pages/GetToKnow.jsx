import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'
import '../Styles/GetToKnow.css'
import { toast, ToastContainer } from 'react-toastify';
import ImageLogo from '../Images/Rotaractlogo.png';
import '../Styles/WhatsNew.css'
function GetToKnow(props) {
  const [load, setLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventload, setEventload] = useState(false);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/Members`);
        setUsers(res.data.Users || []);
        setLoad(true);
      } catch (err) {
        toast.error('Something Went Wrong');
      }
    }
    fetcher();
  }, []);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/EventsInfo`);
        setEvents(res.data.Events);
        setEventload(true);
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
  console.log(events);
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
  const LoadingStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '200px',
    width: '200px',
    zIndex: '1'
  };
  return (
    <>
      <div className="temp">
        <h2>Get To Know Team</h2>
      </div>
      <ToastContainer />
      {!load && (
        <div className='Loading_container1'>
          <img src={ImageLogo} id='LoadingLogo' alt="Loading..." style={LoadingStyle} />
        </div>
      )}
      {!eventload && (
        <div className='Loading_container1'>
          <img src={ImageLogo} id='LoadingLogo' alt="Loading..." style={LoadingStyle} />
        </div>
      )}
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
              <h1>{user.Name}</h1>
              <h2>{user.Role}</h2>
              </div>   
          </motion.div>
        ))}

      </div>
      <div className="btn">
        <h3>Know Our Team</h3>
      </div>
      <div className="container">
        <div className="title">
          <h1>What's New</h1>
        </div>

        <div className="UpcommingEvents">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div className="blocks" key={index}>
                <img
                  src={`data:image/jpeg;base64,${fun(event.Event_image.data)}`}
                  alt={event.name}
                />
                <div className="event-details">
                  <h2>{event.Event_Name}</h2>
                  <p>{event.Event_Description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-events">No upcoming events available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default GetToKnow;
