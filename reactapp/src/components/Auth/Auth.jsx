import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button,Typography} from '@mui/material'

const Auth = () => {
    const navigate = useNavigate()
  return (
    <div>
      <Typography>PG Admissions</Typography>

        <Button variant="outlined" onClick ={()=>navigate('/Login')} >Login</Button>

        <Button variant="outlined"onClick ={()=>navigate('/Signup')}>SignUp</Button>





    </div>
  )
}

export default Auth