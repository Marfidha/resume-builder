import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration.jsx'
import LandingPage from './pages/LandingPage.jsx'

import ResumeType from './pages/ResumeType.jsx'
import ResumeCreate from './pages/ResumeCreate.jsx'
import GenarateResume from './pages/GenarateResume.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ResumeEditpage from './pages/ResumEditpage.jsx'

import Navbar from './components/Navbar.jsx'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import axios from 'axios'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



function App() {


  return (
    <>
      <BrowserRouter>


        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/type/:id' element={<ProtectedRoute><ResumeType /></ProtectedRoute>} />
            <Route path='/create' element={<ProtectedRoute><ResumeCreate /></ProtectedRoute>} />
            <Route path='/resume/:id' element={<ProtectedRoute><GenarateResume /></ProtectedRoute>} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/edit/:id' element={<ProtectedRoute><ResumeEditpage /></ProtectedRoute>} />

          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
