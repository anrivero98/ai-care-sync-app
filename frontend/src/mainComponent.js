import React from "react";
import ReactDOM from "react-dom";
import {useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from "@mui/material/styles";
import Container from '@mui/material/Container';





function MainComponent() {
    return (
        <MainContainerView />   
    )
  }


  function MainContainerView() {
    
    return (
    <Grid container >

    <Grid item sx={{ bgcolor: 'black', width: '70vw', height: '100vh', paddingLeft: 0, paddingRight: 0 }}>
        <Container   
            // TODO - put a zoom video running here
        />
    </Grid>

    <Grid item sx={{ bgcolor: 'white',  width: '30vw', height: '100vh', paddingLeft: 0, paddingRight: 0 }} >
        <Container 
        
            // TODO - Build UI for Zoom App Here
        />
    </Grid>
        
    </Grid>
    )

  }

  export default MainComponent