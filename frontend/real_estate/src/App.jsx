import React from 'react'
import {BrowserRouter , Routes , Route } from 'react-router-dom' 
import Signup from './pages/Signup'
import About from './pages/About'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Header from './components/Header'
export default function App() {
  return  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/sign-in" element={<Signin/>} />
    <Route path="/sign-up" element={<Signup/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/about" element={<About/>} />
  </Routes>
     </BrowserRouter>
}
