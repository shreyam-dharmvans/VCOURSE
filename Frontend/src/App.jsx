import './App.css'
import { Header } from './components/Header'
import { Routes, Route } from "react-router-dom";
import { CourseListing } from './pages/CourseListing';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CourseDetails } from './pages/CourseDetails';
import { useState } from 'react';
import { UserDashboard } from './pages/UserDashboard';



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<CourseListing />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/course' element={<CourseDetails />} />
        <Route path='/user' element={<UserDashboard />} />
      </Routes>
    </>
  )
}

export default App
