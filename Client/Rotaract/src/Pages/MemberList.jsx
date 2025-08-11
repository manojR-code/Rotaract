import React, { useState, useEffect } from 'react';
import '../Styles/WhatsNew.css';
import ImageLogo from '../Images/Rotaractlogo.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../Styles/MemberList.css'
function MemberList() {
    const [load, setLoad] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetcher = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/Members`);
                setUsers(res.data.Users || []);
                setLoad(true);
            } catch (err) {
                toast.error('Something Went Wrong');
            }
        };
        fetcher();
    }, []);

    const fun = (bufferArray) => {
        try {
            if (!bufferArray) return null;
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

    const boxVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const animationProps = {
        variants: boxVariants,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.4 },
    };

    const containerImageStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '40px',
        padding: '20px 0'
    };

    const blocksContainer = {
        marginTop: '20px',
        width: '260px',
        height: '360px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
    };

    return (
        <>
            {!load && (
                <div className='Loading_container1'>
                    <img src={ImageLogo} id='LoadingLogo' alt="Loading..." style={LoadingStyle} />
                </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2c3e50' }}>Our Team</h1>
                <div style={{
                    width: '80px',
                    height: '4px',
                    backgroundColor: '#3498db',
                    margin: '10px auto',
                    borderRadius: '2px'
                }}></div>
            </div>

            <div className="containerimage" style={containerImageStyle}>
                {users && users.map((user, index) => (
                    <motion.div
                        key={user._id || index}
                        className="blocks"
                        style={blocksContainer}
                        {...animationProps}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="images" style={{ height: '70%', overflow: 'hidden' }}>
                            <img
                                src={`data:image/jpeg;base64,${fun(user.Imgae_Upload?.data)}` || ImageLogo}
                                alt={user.Name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div className="info" style={{ padding: '10px' }}>
                            <h2 style={{ fontSize: '1.3rem', margin: '8px 0', color: '#2c3e50' }}>{user.Name}</h2>
                            <h3 style={{ fontSize: '1rem', color: '#7f8c8d' }}>{user.Role}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    );
}

export default MemberList;
