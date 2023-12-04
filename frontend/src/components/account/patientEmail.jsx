import React from 'react';
import { Typography, TextField, Button } from '@mui/material';

const PatientName = ({ email, password, setEmail, setPassword, handleCompleteSignUp }) => {
    const handleSubmit = (event) => {
        console.log("handle submit pressed")
        event.preventDefault();
        handleCompleteSignUp();
    };
    return (
        <>
            <Typography sx={{color: '#90A2B4',
            fontSize:'14px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontStyle:'normal',
            lineHeight:'23px' }}>
                Enter your Email and Password:
            </Typography>
            <form>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                label="Password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit} // Replace with your submit logic
                disabled={!email || !password} // Button is disabled if either name or email is empty
                >
                Complete Sign Up
                </Button>
            </form>
        </>
    );
};

export default PatientName;
