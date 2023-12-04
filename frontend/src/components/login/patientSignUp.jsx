import React, { useState } from 'react';
import { Button, Container, Typography, Paper, Box, TextField } from '@mui/material';
import PatientName from '../account/patientName';
import PatientEmail from '../account/patientEmail';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const PatientSignUp = () => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const [view, setView] = useState('codeEntry'); // State for managing view
  const [firstName, setFirstName] = useState(''); // State for user's name
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); // State for user's email
  const [password, setPassword] = useState('');

  // const [code, setCode] = useState(['', '', '', '', '']); 
  // const mockCode = ['1','2','3','4','5']
  const handleChange = (index, value) => {
    
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });
  };

  const handleCompleteSignUp = async () => {
    console.log("Account Created\n")
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Account created and user signed in');
      // Update the logged-in state in your application
      // This might involve lifting the state up or using a context/global state
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };
  const handleKeyDown = (index, event) => {
    if (event.key === 'Enter') {
      
      if (index < code.length - 1) {
        document.getElementById(`code-input-${index + 1}`).focus();
      } else {
       
        handleNext();
      }
    }

    if (event.key === 'Backspace') {
      
      if (code[index] === '' && index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
      } else {
        
        handleChange(index, '');
      }
    }
    else if (event.key === 'ArrowLeft' && index > 0) {
     
      document.getElementById(`code-input-${index - 1}`).focus();
    } else if (event.key === 'ArrowRight' && index < code.length - 1) {
 
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleNext = () => {
    const enteredCode = code.join('');
    if (enteredCode === 'abcde') {
      setView('userInfo'); // Switch to the user info entry view
      setCode(['', '', '', '', '']); // Reset the code array
    } else {
      // Handle incorrect code
      console.log('Incorrect code. Please try again.');
      setCode(['', '', '', '', '']);
    }
  };

  const handleUserInfoSubmit = () => {
    if (firstName && lastName) {
      setView('userEmail'); // Switch to the user email entry view
    } else {
      console.log('First and last names are required');
    }
  };

  const handleUserEmailSubmit = () => {
    if (email && password) {
      console.log('Submit email and password'); // Replace with actual submit logic
    } else {
      console.log('Email and password are required');
    }
  };
  

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="65vh"
    > 
    
      <Container component="main" maxWidth="md" >
        <Paper elevation={2} style={{ padding: 20, textAlign: 'left' }}>
        <Box display="flex" gap={1} flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
          <Typography sx={{color: '#131619',fontSize:'32px',
           fontFamily: 'Poppins, sans-serif',
           fontWeight: 600,fontStyle:'normal',
           marginTop:'4vh'}}>
            Patient Sign Up
          </Typography>
        </Box>
        <Container component="main" maxWidth="sm">
        {view === 'codeEntry' && (
          <>
          <Typography sx={{color: '#131619',
          fontSize:'18px',
          marginTop: 2,
           fontFamily: 'Poppins, sans-serif',
           fontWeight:600,fontStyle:'normal' }}>
            Session Code
          </Typography>
          <Typography sx={{color: '#90A2B4',
           fontSize:'14px',
           fontFamily: 'Poppins, sans-serif',
           fontWeight: 400,
           fontStyle:'normal',
           lineHeight:'23px' }}>
            Enter the 5-digit code your doctor gave you:
          </Typography>
          <form>
            <Box display="flex" flexDirection="row" marginBottom='5vh' justifyContent='center' marginTop='3vh'>
              {code.map((digit, index) => (
                <TextField
                  key={index}
                  variant="outlined"
                  margin="normal"
                  required
                  autoComplete="off"
                  inputProps={{ maxLength: 1, style: { textAlign: 'center', textTransform: 'capitalize', color: '#131619', fontSize: '22px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' } }}
                  id={`code-input-${index}`}
                  style={{ width: '50px', height: '50px', marginRight: '8px' }}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value).toUpperCase()}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />

              ))}
            </Box>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          </form>
          </>
        )}
        {view === 'userInfo' && (
          <PatientName
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          handleUserInfoSubmit={handleUserInfoSubmit} />
        )}
        {view === 'userEmail' && (
          <PatientEmail
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleCompleteSignUp={handleCompleteSignUp}
          />
          )}
      </Container>
      </Paper>
      </Container>
    </Box>
  );
};

export default PatientSignUp;