import React, { useState, useEffect } from 'react';
import '../Styles/AdminDashboard.css';
import axios from 'axios';
import Logo from '../../public/Images/Rotaract-e1690287173287.png';
import { toast, ToastContainer } from 'react-toastify';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', role: '', image: null });
  const [change, setChange] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function FetchUsers() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/Members`);
        setUsers(res.data.Users || []);
        setLoad(true);
      } catch (err) {
        toast.error('Something Went Wrong');
        setLoad(true);
      }
    }
    FetchUsers();
  }, [change]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    if (selected.length < 1) {
      toast.warning('Select minimum two users');
      return;
    }
    try {
      setLoad(false);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/RemoveSelected`, {
        selected
      });
      setChange((prev) => !prev);
    } catch (error) {
      toast.error('Internal server error');
      setLoad(true);
    }
    setSelected([]);
  };

  const deleteUser = async (id) => {
    setUsers((prev) => prev.filter((u) => u._id !== id));
    setLoad(false);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/RemoveMember`, {
        id
      });
      setChange((prev) => !prev);
    } catch (error) {
      toast.error('Internal server error');
      setLoad(true);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { name, role, image } = form;

    if (!name || !role || !image) {
      return alert('Please fill all fields');
    } else {
      setLoad((prev) => !prev);
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Role', role);
      formData.append('image', image);

      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/CreateUser`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setForm({ name: '', role: '', image: null });
        setChange((prev) => !prev);
      } catch (err) {
        toast.error('Something Went Wrong');
        setLoad(true);
      }
    }
  };

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


  const filteredUsers = users.filter((u) =>
    u.Name?.toLowerCase().includes(search.toLowerCase())
  );

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
      {!load && (
        <div className='Loading_container'>
          <img src={Logo} id='LoadingLogo' alt="Loading..." style={LoadingStyle} />
        </div>
      )}

      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <ToastContainer />
        <div className="admin-bar">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="delete-btn" onClick={deleteSelected}>
            Delete Selected
          </button>
        </div>

        <form className="create-form" onSubmit={handleCreate}>
          <h2>Create New Member</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              className="preview"
              alt="preview"
            />
          )}
          <button type="submit" className="create-btn">
            Create Member
          </button>
        </form>

        <div className="user-grid">
          {filteredUsers.map((user) => (
            <div className="user-card" key={user._id}>
              <input
                type="checkbox"
                checked={selected.includes(user._id)}
                onChange={() => toggleSelect(user._id)}
              />

              {user.Imgae_Upload && user.Imgae_Upload.data && (
                <img
                  src={`data:image/jpeg;base64,${fun(user.Imgae_Upload.data)}`}
                  alt={user.Name}
                  className="user-img"
                />
              )}

              <div className="user-info">
                <h3>{user.Name || 'Unnamed'}</h3>
                <p>{user.Role || 'No Role'}</p>
              </div>

              <div className="card-actions">
                <button className="delete-btn" onClick={() => deleteUser(user._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
