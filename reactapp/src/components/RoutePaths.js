import React from 'react';
import Signup from './Auth/Signup/Signup';
import Login from './Auth/Login/Login';
import Auth from './Auth/Auth'
import HomePage from './User/HomePage/HomePage';
import UniversityList from './User/HomePage/UniversityList'; // Import UniversityList component
import RegisteredCourses from './User/HomePage/RegisteredCourses'; // Import RegisteredCourses component
import { Routes, Route } from 'react-router-dom';

const RoutePaths = () => {
  return (
    <Routes>
      <Route path="/" element = {<Auth />}/>
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/HomePage/:userId" element={<HomePage />}/>
      <Route path="/HomePage/UniversityList/:userId" element={<UniversityList />} />
      <Route path="/HomePage/RegisteredCourses/:userId" element={<RegisteredCourses />} />
      
       
        
  
    </Routes>
  );
};

export default RoutePaths;
