import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from '@mui/material'

const Auth = () => {
    const navigate = useNavigate()
  return (
    <div>
        <Button variant="outlined" onClick ={()=>navigate('/Login')} >Login</Button>

        <Button variant="outlined"onClick ={()=>navigate('/Signup')}>SignUp</Button>





    </div>
  )
}

export default Auth