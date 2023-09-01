import React from 'react'
import Signup from './Auth/Signup/Signup'
import Login from './Auth/Login/Login'
import HomePage from './User/HomePage/HomePage'
import{Routes,Route} from 'react-router-dom'

const RoutePaths = () => {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Signup" element={<Signup />} />
    <Route path = "/HomePage/:userId" element ={<HomePage />} />
  </Routes>
    
  )
}

export default RoutePaths