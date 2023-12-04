import React, { useState } from 'react';
import { Button, Container, Typography, Grid, Paper, Box, TextField } from '@mui/material';
import DoctorName from '../account/doctorName';
import DoctorEmail from '../account/doctorEmail';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';




const DoctorSignUp = ({ inputString }) => {
  const [code, setCode] = useState(new Array(5).fill('')); // Initialize an array with 5 empty strings
  const [view, setView] = useState('codeEntry');
  const [firstName, setFirstName] = useState(''); // State for user's name
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState(''); // State for user's email
  const [password, setPassword] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = inputString;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        console.log('Text copied to clipboard:', textToCopy);
      },
      (err) => {
        console.error('Unable to copy text to clipboard', err);
      }
    );
  };

  
  const handleChange = (index, value) => {
    // Update the code array based on the input index and value
    setCode(currentCode => {
      const newCode = [...currentCode];
      newCode[index] = value;
      return newCode;
    });
  };

  const handleNext = () => {
    const enteredCode = code.join('');
    if (isCodeComplete) {
      setView('userInfo'); // Switch to the user info entry view
      console.log('Entered Code:', enteredCode);
    // ...additional logic for handling the entered code...
    } else {
      console.log('Please fill in all the code fields');
    }
  };

  const handleUserInfoSubmit = () => {
    if(firstName && lastName && title){
      setView('userEmail')
    } else {
      console.log('Missing fields')
    }
  }

  // const handleUserEmailSubmit = async () => {
  //   if (email && password) {
  //     const auth = getAuth();
  //     try {
  //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //       console.log('Account created and user signed in:', userCredential.user);
  //       // Update your application's state to reflect that the user is signed in
  //       // For example, you could lift state up to a parent component or use a global state management solution
  //     } catch (error) {
  //       console.error('Error creating account:', error);
  //     }
  //   } else {
  //     console.log('Email and password are required');
  //   }
  // };

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

  const handleKeyDown = (event, index) => {
    // Add logic to handle focus movement between the input boxes if needed
  };

  const isCodeComplete = code.every(char => char.trim() !== ''); // Check if all inputs have been filled

  return (

    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="60vh"
    > 
    
      <Container component="main" maxWidth="xs" >
        <Paper elevation={2} style={{ padding: 20, textAlign: 'left' }}>
    <Box display="flex" gap={1} flexDirection="column" alignItems="flex-start" justifyContent="flex-start">

      <Typography sx={{color: '#131619',fontSize:'32px', fontFamily: 'Poppins, sans-serif',fontWeight: 600,fontStyle:'normal' ,marginTop:'4vh',marginBottom:'4vh'}}>
        Doctor Sign Up
      </Typography>

      
    </Box>
    
    <Container component="main" maxWidth="xs" >
    {view === 'codeEntry' && (
      <>
      <Typography sx={{color: '#131619',fontSize:'18px', fontFamily: 'Poppins, sans-serif',fontWeight:600,fontStyle:'normal' }}>
        Your Code
      </Typography>

      <Typography sx={{color: '#90A2B4',fontSize:'14px', fontFamily: 'Poppins, sans-serif',fontWeight: 400,fontStyle:'normal',lineHeight:'23px' }}>
      Your unique code you’ll use with your patients. You can always find it in your profile.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: 2 }}>
        {code.map((digit, index) => (
          <TextField
            key={index}
            variant="outlined"
            margin="normal"
            required
            autoComplete="off"
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: '22px', fontWeight: 'bold'}
            }}
            id={`code-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value).toUpperCase()} // Convert input to uppercase
            // onKeyDown={(e) => handleKeyDown(e, index)} // Implement as needed
          />
        ))}
      </Box>
      <Button
        variant="contained"
        disabled={!isCodeComplete}
        onClick={handleNext} // Replace with actual logic
        sx={{ 
          marginTop: 1, // Reduced space above the button
          padding: '10px 0', // Larger padding for a bigger button
          width: '80%', // Larger width for a bigger button
          fontSize: '1rem', // Larger font size
        }}
      >
        Next
      </Button>
      
    </Box>
    <Button
        variant="contained"
        onClick={copyToClipboard}
        sx={{ marginTop: 3, backgroundColor: 'transparent', color: 'blue', fontSize: '10px' }}
      >
        Copy Code
      </Button>
      </>
    )}
    {view === 'userInfo' && (
        <DoctorName
        firstName={firstName}
        lastName={lastName}
        title={title}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setTitle={setTitle}
        handleUserInfoSubmit={handleUserInfoSubmit}
        />
    )}
    {view === 'userEmail' && (
      <DoctorEmail
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleCompleteSignUp={handleCompleteSignUp} // Updated function name
      />
    )}

      </Container>
      </Paper>
          
      </Container>
    </Box>
  );
};

export default DoctorSignUp;