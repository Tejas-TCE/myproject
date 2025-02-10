import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navbar } from 'react-bootstrap'
import './App.css'
import { Outlet } from 'react-router-dom'





import Navbarpag from './pag/Navbar'
// import Loginpag from './pag/loginpag.jsx';
import Home from './pag/Home.jsx';
import About from './pag/About.jsx';
import Contact from './pag/Contact.jsx';
import Protected from './protected/Protected.jsx';
import Loginpag from './pag/Loginpag.jsx';
import Register from './pag/register.jsx'
import Detallogin from './pag/Detallogin.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"




function App() {










  return (
    <>

      <BrowserRouter>
        <Navbarpag />
    
        <Routes>
        <Route index element={<Protected Component={About} />} />
          <Route path="/Home" element={<Protected Component={Home} />} />
          <Route path="/About"  element={<Protected Component={About} />} />
          <Route path="/Contact" element={<Protected Component={Contact} />} />
          <Route path="/Loginpag" element={<Loginpag />}/>  
          <Route path="/Register" element={<Register />}/>
          <Route path="/Detallogin" element={<Detallogin />}/>
          
         
        
          
        </Routes>

      </BrowserRouter>

   

    </>
  )
}

export default App
