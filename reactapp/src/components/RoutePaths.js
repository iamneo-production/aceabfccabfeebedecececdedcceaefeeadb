
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
import AdminAllCourses from './Admin/AdminAllCourses';

const RoutePaths = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />     
      <Route path="/HomePage/UniversityList/:userId" element={<UniversityList />} />
      <Route path="/HomePage/RegisteredCourses/:userId" element={<RegisteredCourses />} />    
      <Route path="/AdminHomePage/UniversityList/:userId" element={<AdminUniversityList />} />
      <Route path="/AdminHomePage/Courses/:userId" element={<AdminCourses />} />
      <Route path="/AdminHomePage/Students/:userId" element={<AdminStudents />} />
      <Route path = "/AdminHomePage/AllCourses/:userId" element={<AdminAllCourses/>}/>
    </Routes>
  );
};

export default RoutePaths;
