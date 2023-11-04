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

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "EMPTY",
  baseURL: "http://kobe-4u-3.soe.ucsc.edu:8001/v1",
  dangerouslyAllowBrowser: true
});

// const SYSTEM_PROMPT = "I will show you a running conversation between a doctor and a patient. You are a virtual assistant for the patient. Your job is to suggest follow-up questions that the patient should ask the doctor.  Please make sure the questions are brief and concise and can be quickly read and understood by the patient. Please restrict yourself to 2-3 questions. Return the questions as an array in javascript called questions. Do not say anything else"
const SYSTEM_PROMPT = "I will show you a running conversation between a doctor and a patient. You are a virtual assistant for the patient. Your job is to suggest follow-up questions that the patient should ask the doctor. Make sure the questions are in first person. Please make sure the questions is short, no more than one sentence and can be quickle read. Please ask only one question. Format your response as Question:<question>. Do not say anything else."





function MainComponent() {
    return (
        <MainContainerView />   
    )
  }


  function MainContainerView() {
    
    const [speechList, setSpeechList] = useState([]);
    const [genQuestions, setQuestions] = useState('');

    var isMounted = false
    
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        if(!isMounted) {
            isMounted = true
            try {
            
                let finalTranscript = '';
                let interimTranscript = '';
                recognition.onresult = function (event) {
                console.log(speechList)  
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                      if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                        console.log(finalTranscript)
                        if (finalTranscript.length >= 10)
                        {
                          console.log(finalTranscript)
                          let message = [{role:"system", content:SYSTEM_PROMPT}, {role:"user", content:finalTranscript}]
                          openai.chat.completions.create({
                            model: "vicuna_13b",
                            messages: message, 
                          })
                          .then(response => {
                            setQuestions(prevQuestion => {
                              return response.choices[0].message.content
                            })
                            console.log("LLM Returned Question: ", response.choices[0].message.content)
                          })
                          .catch(err => {
                            console.log(err);
                          });
                        }
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
      text
    </Grid>

    <Grid item sx={{ bgcolor: 'grey',  width: '40vw', height: '100vh', paddingLeft: 0, paddingRight: 0 }} >
        <Chat generated_questions={genQuestions} random={"something else"} transcriptList={speechList}/>

    </Grid>
        
    </Grid>
    )

  }

  export default MainComponent