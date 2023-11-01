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

  function fnBrowserDetect(){
                 
    let userAgent = navigator.userAgent;
    
    let browserName;
    
    if(userAgent.match('/chrome|chromium|crios/i')){
        browserName = "chrome";
      }else if(userAgent.match('/firefox|fxios/i')){
        browserName = "firefox";
      }  else if(userAgent.match('/safari/i')){
        browserName = "safari";
      }else if(userAgent.match('/opr//i')){
        browserName = "opera";
      } else if(userAgent.match('/edg/i')){
        browserName = "edge";
      }else{
        browserName="No browser detection";
      }

      return userAgent
            
}


  function MainContainerView() {
    
    const [speechList, setSpeechList] = useState([]);

    var isMounted = false

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        if(!isMounted) {
            isMounted = true
            try {
            
                let finalTranscript = '';
                let interimTranscript = '';
                recognition.onresult = function (event) {
                    
    



                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                      if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                        setSpeechList(prev_state => {
                            if(prev_state.length > 0) {
                                let old_transcript = prev_state[prev_state.length - 1]
                                finalTranscript = finalTranscript.replace(old_transcript, '')
                            }

                            return [...prev_state, finalTranscript]
                        })
                      } else {
                        // interimTranscript += event.results[i][0].transcript;
                        // setSpeechList(prev_state => {
                        //     return [interimTranscript]
                        // })
                      }
                    }
                  }
                  recognition.start() 
            }
            catch(e) {
                console.log("ERROR")
            }
        }
    



    }, [])
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


//   console.log('Interim transcript: ', interimTranscript);
//   console.log('Final transcript: ', finalTranscript);
// };

// recognition.onerror = function (event) {
//   console.error('Speech recognition error: ', event.error);
// };

// recognition.onend = function () {
//   console.log('Speech recognition ended');
// };

// // Start speech recognition
// recognition.start();

  export default MainComponent