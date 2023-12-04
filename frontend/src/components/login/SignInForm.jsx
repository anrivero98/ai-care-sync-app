import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth functions
import { auth } from '../../config.js'; // Import your Firebase auth instance

const SignInForm = ({ onSignUpClick, onLoginAttempt }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    console.log('User password: ', password)
    event.preventDefault();

    onLoginAttempt(email, password);
    /* Firebase Components to be used for later */
    try {
      // Firebase sign-in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User is signed in
      // You might want to update app state or redirect the user
      console.log(userCredential.user.email);
      // console.log(userCredential.user.setPassword);
    } catch (error) {
      // Handle errors
      console.error('Error signing in with email and password', error);
    }
  };

  return (
    <Box sx={{ maxWidth: '400px', margin: 'auto' }}>
      <Box sx={{ marginBottom: '20px' }}>
        <Button onClick={() => console.log("Will add Google later!")} sx={{ width: '100%', marginBottom: '10px' }}>Log in with Google</Button>
        <Button onClick={() => console.log("Will add Zoom later!")} sx={{ width: '100%' }}>Log in with Zoom</Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Button type="submit" sx={{ width: '100%' }}>Log in</Button>
        </Box>
      </form>
      <Box onClick={() => console.log('I forgot my password')} sx={{ textAlign: 'center', fontSize: '0.9em', cursor:"pointer" }}>
        Forgot Password?
      </Box>
      <Box sx={{ textAlign: 'center', fontSize: '0.9em', marginTop: '20px' }}>
        <span onClick={onSignUpClick} style={{ cursor: "pointer", textDecoration: "underline" }}>Sign Up</span>
      </Box>
    </Box>
  );
};

export default SignInForm;
