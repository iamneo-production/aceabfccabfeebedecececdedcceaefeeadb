import React from 'react'
import {useParams} from 'react-router-dom'
import UserAppBar from '../../UserAppBar'

const RegisteredCourses = () => {
  const params =  useParams()
  return (
    <>
    <UserAppBar id={params.userId}/>
    <div>RegisteredCourses</div>
    </>
  )
}

export default RegisteredCourses