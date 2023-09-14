
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './Auth/Signup/Signup';
import Login from './Auth/Login/Login';
import Auth from './Auth/Auth';
import UniversityList from './User/HomePage/UniversityList'; // Import UniversityList component
import RegisteredCourses from './User/HomePage/RegisteredCourses'; // Import RegisteredCourses component
import AdminUniversityList from './Admin/AdminUniversityList';
import AdminCourses from './Admin/AdminCourses';
import AdminStudents from './Admin/AdminStudents';

const RoutePaths = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />     
      <Route path="/HomePage/UniversityList/:UserId" element={<UniversityList />} />
      <Route path="/HomePage/RegisteredCourses/:UserId" element={<RegisteredCourses />} />    
      <Route path="/AdminHomePage/UniversityList/:UserId" element={<AdminUniversityList />} />
      <Route path="/AdminHomePage/Courses/:UserId" element={<AdminCourses />} />
      <Route path="/AdminHomePage/Students/:UserId" element={<AdminStudents />} />
    </Routes>
  );
};

export default RoutePaths;
