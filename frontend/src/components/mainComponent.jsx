import React from "react";
import MainContainerView from "./MainContainerView";


{/* Unnecessary Imports */}

// import {useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid';
// import Modal from "./modal";
// import Chat from './chat'
// import { ManOutlined } from "@mui/icons-material";
// import ReactDOM from "react-dom";
// import Stack from '@mui/material/Stack';
// import { styled } from "@mui/material/styles";
// import Container from '@mui/material/Container';
// const { OpenAI } = require("openai");




function MainComponent() {
    // const [isOpen, setIsOpen] = useState(true);
    return (
        // <div>
        //   <Modal open={isOpen}/>
        // </div>
        <div className="Zoom-Container">
          <MainContainerView />
        </div>
    )
  }
  export default MainComponent