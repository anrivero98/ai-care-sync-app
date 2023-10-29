import React from "react";
import ReactDOM from "react-dom";
import {useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from "@mui/material/styles";
import Container from '@mui/material/Container';

import Chat from './components/chat'





function MainComponent() {
    return (
        <MainContainerView />   
    )
  }


  function MainContainerView() {
    
    return (
        
    <Grid container >

    <Grid item sx={{ bgcolor: 'black', width: '60vw', height: '100vh', paddingLeft: 0, paddingRight: 0 }}>
        Test
    </Grid>

    <Grid item sx={{ bgcolor: 'grey',  width: '40vw', height: '100vh', paddingLeft: 0, paddingRight: 0 }} >
        <Chat />

    </Grid>
        
    </Grid>
    )

  }

  export default MainComponent