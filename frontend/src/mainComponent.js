import React from "react";
import ReactDOM from "react-dom";
import {useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from "@mui/material/styles";
import Container from '@mui/material/Container';
// const { OpenAI } = require("openai");
import Chat from './components/chat'
import { useState } from 'react';






function MainComponent() {
    return (
        <MainContainerView />   
    )
  }


  function MainContainerView() {
    
    return (
    <Grid container >

    <Grid item sx={{ bgcolor: 'white', width: '50vw', height: '100vh', paddingLeft: 0, paddingRight: 0 }}>
        
    </Grid>

    <Grid item sx={{ bgcolor: 'white',  width: '50vw', height: '100vh', paddingLeft: 0, paddingRight: 0 }} >
        <Chat />
    </Grid>
        
    </Grid>
    )

  }

  export default MainComponent