import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Whatsapp from './pages/whatsapp'
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Registration from './pages/Registration';
import OTPVerification from './pages/otpVerification'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/whatsapp" element={<Whatsapp />} />
        <Route path="/register" element={<Registration />} /> 
        <Route path="/otp" element={<OTPVerification />} /> 

      </Routes>
    </Router>
  );
}

export default App;

