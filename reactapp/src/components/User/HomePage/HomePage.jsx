import * as React from 'react';
import { Tabs, Tab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import UniversityList from './UniversityList';


const defaultTheme = createTheme();

const HomePage = () => {
  const params = useParams();
  console.log(params.userId);
  const userId = params.userId



  return (

    
   
      <UniversityList id={userId}/>
  
      



     

  );
};

export default HomePage;
