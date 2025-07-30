import React, { useState, useEffect } from 'react';
import '../Styles/AdminDashBoard.css';
import axios from 'axios';
import Logo from '../../public/Images/Rotaract-e1690287173287.png';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', role: '', image: null,priority:'' });
  const [eventForm, setEventForm] = useState({ eventName: '', description: '', image: null });
  const [change, setChange] = useState(false);
  const [load, setLoad] = useState(false);
  const [Event, setEvent] = useState([]);
  const [echange, esetChange] = useState(false);
  const [admin, setAdmin] = useState('Verify');
  const location = useLocation();
  useEffect(() => {
    setAdmin(location.state.admin);
  }, []);
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
  useEffect(() => {
    const fetcher = async () => {
      try {
        const EventsList = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/EventsInfo`);
        setEvent(EventsList.data.Events || []);
        setLoad(true);
      } catch (err) {
        toast.error('Something Went Wrong');
        setLoad(true);
      }
    };
    fetcher();
  }, [echange]);

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const deleteSelected = async () => {
    if (selected.length < 1) return toast.warning('Select minimum two users');
    try {
      setLoad(false);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/RemoveSelected`, { selected });
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
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/RemoveMember`, { id });
      setChange((prev) => !prev);
    } catch (error) {
      toast.error('Internal server error');
      setLoad(true);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { name, role, image,priority } = form;
    if (!name || !role || !image || !priority) return alert('Please fill all fields');
    else {
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('Role', role);
      formData.append('image', image);
      formData.append('priority', priority);
      try {
        setLoad(false);
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/CreateUser`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setForm({ name: '', role: '', image: null });
        setChange((prev) => !prev);
      } catch (err) {
        toast.error('Something Went Wrong');
        setLoad(true);
      }
    }
  };

  const RemoveEvent = async (id) => {
    try {
      setLoad(false);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/RemoveEvent`, { id });
      toast.success('Event Removed Successfully');
      esetChange((prev) => !prev);
      setEvent((prev) => prev.filter((ev) => ev._id !== id));
    } catch (error) {
      toast.error('Error removing event');
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (Event.length > 1) {
      toast.warn('You Can Upload only two Event At Any Time Sorry Try To Remove Some Events');
    } else {
      const { eventName, description, image } = eventForm;
      if (!eventName || !description || !image) return alert('Fill all event fields');

      const formData = new FormData();
      formData.append('eventName', eventName);
      formData.append('description', description);
      formData.append('image', image);

      try {
        setLoad(false);
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/CreateEvent`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        esetChange((prev) => !prev);
        await toast.success('Event Uploaded Successfully');
        setEventForm({ eventName: '', description: '', image: null });
      } catch (error) {
        toast.error('Error uploading event');
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
        <h1> Hii {admin}</h1>
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
          <input type="text" placeholder="Full Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="text" placeholder="Role" value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <input type="text" placeholder='Priority in small word' value={form.priority|| ''}
          onChange={(e=> setForm({...form,priority:e.target.value}))}/>
          <input type="file" accept="image/*" onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })} />
          {form.image && <img src={URL.createObjectURL(form.image)} className="preview" alt="preview" />}
          <button type="submit" className="create-btn">Create Member</button>
        </form>

        <form className="create-form" onSubmit={handleEventSubmit}>
          <h2>Upload Upcoming Event ifno</h2>
          <input type="text" placeholder="Event Name" value={eventForm.eventName}
            onChange={(e) => setEventForm({ ...eventForm, eventName: e.target.value })} />
          <textarea rows={4} placeholder="Event Description"
            value={eventForm.description}
            onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
          <input type="file" accept="image/*"
            onChange={(e) => setEventForm({ ...eventForm, image: e.target.files[0] })} />
          {eventForm.image && <img src={URL.createObjectURL(eventForm.image)} className="preview" alt="event-preview" />}
          <button type="submit" className="create-btn">Upload Event</button>
        </form>

        <div className="user-grid">
          {filteredUsers.map((user) => (
            <div className="user-card" key={user._id}>
              <input
                type="checkbox"
                checked={selected.includes(user._id)}
                onChange={() => toggleSelect(user._id)}
              />
              {user.Imgae_Upload?.data && (
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
          <h2>Upcoming Events</h2>
          <div className="event-grid">
            {Event.map((ev) => (
              <div className="event-card" key={ev._id}>
                {ev.Event_image?.data && (
                  <img
                    src={`data:image/jpeg;base64,${fun(ev.Event_image.data)}`}
                    alt={ev.Event_Name}
                    className="event-img"
                  />
                )}
                <div className="event-info">
                  <h3>{ev.Event_Name || 'No Name'}</h3>
                  <p>{ev.Event_Descritpion || 'No Description'}</p>
                  <button className="remove-btn" onClick={() => RemoveEvent(ev._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminDashboard;
