
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Chat from './chat/chat';
import FirestoreFunctions from '../service/firestoreFunctions';
import LoginWindow from './login/loginWindow';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config'; // Adjust the path as necessary


const { OpenAI } = require("openai");

const mockCredentials = {
  email: 'test@ucsc.edu',
  password: 'password',
};

const openai = new OpenAI({
  apiKey: "EMPTY",
  baseURL: "http://kobe-4u-3.soe.ucsc.edu:8001/v1",
  dangerouslyAllowBrowser: true
});

// const SYSTEM_PROMPT = "I will show you a running conversation between a doctor and a patient. You are a virtual assistant for the patient. Your job is to suggest follow-up questions that the patient should ask the doctor.  Please make sure the questions are brief and concise and can be quickly read and understood by the patient. Please restrict yourself to 2-3 questions. Return the questions as an array in javascript called questions. Do not say anything else"
const SYSTEM_PROMPT = "I will show you a running conversation between a doctor and a patient. You are a virtual assistant for the patient. Your job is to suggest follow-up questions that the patient should ask the doctor. Make sure the questions are in first person. Please make sure the questions is short, no more than one sentence and can be quickle read. Please ask only one question. Format your response as Question:<question>. Do not say anything else."

const MainContainerView = () => {
    
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [speechList, setSpeechList] = useState([]);
    const [genQuestions, setQuestions] = useState('');

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User ', user.email)
          // console.log('Password ', user.)
          // User is signed in
          setLoggedIn(true);
        } else {
          // User is signed out
          setLoggedIn(false);
        }
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);
    

    const createTestAccount = async () => {
      const email = 'test@ucsc.edu'; // Change to your desired test account email
      const password = 'password'; // Change to your desired test account password
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Test account created:', userCredential.user);
      } catch (error) {
        console.error('Error creating test account:', error);
      }
    };

    // useEffect(() =>{
    //   createTestAccount();
    //   // console.log()
    // }, []);
    const handleSignOut = async () => {
      const auth = getAuth();
      try {
        await signOut(auth);
        setLoggedIn(false);
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };
    const userLogin = async (username, password) => {
      // try {
      //   // Check if the provided credentials match the mock credentials
      //   if (username === mockCredentials.email && password === mockCredentials.password) {
      //     setLoggedIn(true); // Log the user in
      //     console.log('Mock login successful');
      //   } else {
      //     console.log('Mock login failed. Please check your username and password.');
      //   }
      // } catch (error) {
      //   console.error('Login error:', error);
      // }

      /* Firebase calls (use later) */
      try {
        // Call a service function to validate the user.
        // This is usually an async call to a backend service or database.
        const isValid = await FirestoreFunctions.validateUser(username, password);
        
        // If the user is valid, update the loggedIn state to true.
        if (isValid) {
          setLoggedIn(true);
        } else {
          // Handle the case where login is not successful.
          // You could set an error message state here to display a message to the user.
          console.log('Login failed. Please check your username and password.');
        }
      } catch (error) {
        // Handle any errors that occur during the login process
        console.error('Login error:', error);
      }
    };

    var isMounted = false;
    
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        if(!isMounted) {
            isMounted = true;
            try {
                let finalTranscript = '';
                recognition.onresult = function (event) {
                  for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                      finalTranscript += event.results[i][0].transcript;
                      if (finalTranscript.length >= 10) {
                        let message = [{role:"system", content:SYSTEM_PROMPT}, {role:"user", content:finalTranscript}];
                        openai.chat.completions.create({
                          model: "vicuna_13b",
                          messages: message, 
                        })
                        .then(response => {
                          setQuestions(prevQuestion => {
                            return response.choices[0].message.content;
                          });
                        })
                        .catch(err => {
                          console.log(err);
                        });
                      }
                      setSpeechList(prev_state => {
                        if(prev_state.length > 0) {
                          let old_transcript = prev_state[prev_state.length - 1];
                          finalTranscript = finalTranscript.replace(old_transcript, '');
                          let sessionID = "6r6UljhafcmYPdJ4FQmA";
                          let speakerID = "CM2eZq6c1P008ONaEMDD";
                          const currentTime = new Date().getTime();
                          const currentTimestamp = new Date(currentTime);
                          FirestoreFunctions.addTranscript(sessionID, speakerID, finalTranscript, currentTimestamp);
                        }
                        return [...prev_state, finalTranscript];
                      });
                    }
                  }
                  recognition.start();
                }
            } catch(e) {
                console.log("ERROR");
            }
        }
    }, []);

    return (
      <Grid container>
        <Grid item sx={{ bgcolor: 'black', width: '60vw', height: '100vh', paddingLeft: 0, paddingRight: 0 }}>
          {/* text */}
        </Grid>
        <Grid item sx={{ bgcolor: 'grey',  width: '40vw', height: '100vh', paddingLeft: 0, paddingRight: 0 }}>
        {isLoggedIn ? (
              <Chat 
              handleSignOut={handleSignOut} 
              generated_questions={genQuestions}
              random={"something else"}
              transcriptList={speechList}
              />
            ) : (
              <LoginWindow handleUserLogin={userLogin} />

            )}
          {/* <LoginWindow /> */}
        </Grid>
      </Grid>
    );
};

export default MainContainerView;
