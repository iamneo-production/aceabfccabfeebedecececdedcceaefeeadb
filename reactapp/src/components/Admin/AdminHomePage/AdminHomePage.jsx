import React from 'react'
import AdminAppBar from '../../AdminAppBar'
import { useParams } from 'react-router-dom';
import AdminUniversityList from '../AdminUniversityList'
const AdminHomePage = () => {
  const params = useParams();
  console.log(params.userId);
  const userId = params.userId
  return (
    <AdminUniversityList id={userId}/>

  )
}

export default AdminHomePage