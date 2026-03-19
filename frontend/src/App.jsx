import { useState } from 'react'

import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ResumeBuild from './pages/ResumeBuild.jsx'
import ResumeType from './pages/ResumeType.jsx'
import ResumeCreate from './pages/ResumeCreate.jsx'
import GenarateResume from './pages/GenarateResume.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ResumeEditpage from './pages/ResumEditpage.jsx'
import ImportResume from './pages/ImportResume.jsx'
import Navbar from './components/Navbar.jsx'
import Layout from './components/Layout.jsx'



function App() {
 

  return (
    <>
      <BrowserRouter>
      
      
      <Routes>
        <Route element={<Layout/>}>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/resume' element={<ResumeBuild/>}/>
        <Route path='/type/:id' element={<ResumeType/>}/>
        <Route path='/create' element={<ResumeCreate/>}/>
        <Route path='/resume/:id'element={<GenarateResume/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/edit/:id' element={<ResumeEditpage/>}/>
        <Route path='/import' element={<ImportResume/>}/>
        </Route>
      </Routes>
       
      </BrowserRouter>
    </>
  )
}

export default App
