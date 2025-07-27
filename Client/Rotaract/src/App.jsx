import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import FrontPage from './Pages/FrontPage';
import MissionGoal from './Pages/MissionGoal';
import SuccessStories from './Pages/SuccessStories';
import ScrollTriggered from './Pages/GetToKnow';
import Member from './Pages/Member';
import WhatsNew from './Pages/WhatsNew';
import ContactUs from './Pages/ContactUs';
import AdminLogin from './Pages/LoginPage';
import AdminDashboard from './Pages/AdminDashBoard';
function MainPageSections() {
  return (
    <>
      <FrontPage />
      <MissionGoal />
      <SuccessStories />
      <ScrollTriggered />
      <WhatsNew />
      <Member />
      <ContactUs />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPageSections />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path='/AdminDashBoard' element={<AdminDashboard/>}></Route>
    </Routes>
  );
}

export default App;
