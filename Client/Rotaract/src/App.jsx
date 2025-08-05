import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import FrontPage from './Pages/FrontPage';
import MissionGoal from './Pages/MissionGoal';
import SuccessStories from './Pages/SuccessStories';
import ScrollTriggered from './Pages/GetToKnow';
import Member from './Pages/Member';
import ContactUs from './Pages/ContactUs';
import AdminLogin from './Pages/LoginPage';
import AdminDashboard from './Pages/AdminDashBoard';
import MemberList from './Pages/MemberList';
function MainPageSections() {
  return (
    <>
      <FrontPage />
      <MissionGoal />
      <SuccessStories />
      <ScrollTriggered />
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
      <Route path='/AdminDashBoard' element={<AdminDashboard />}></Route>
      <Route path='/MemberList' element={<MemberList/>}></Route>
    </Routes>
  );
}

export default App;
