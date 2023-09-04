import * as React from 'react';
import { Tabs, Tab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import UserAppBar from '../../UserAppBar';
import UniversityList from './UniversityList';
import RegisteredCourses from './RegisteredCourses';
import Layout from '../../Layout'

const defaultTheme = createTheme();

const HomePage = () => {
  const params = useParams();
  console.log(params.userId);
  const userId = params.userId



  return (
    <Layout>
    
   
      <UniversityList id={userId}/>
  
      



     
    </Layout>
  );
};

export default HomePage;
