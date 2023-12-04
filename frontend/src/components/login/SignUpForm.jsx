import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import DoctorSignUp from './doctorSignUp';
import PatientSignUp from './patientSignUp';


const SignUpForm = ({ onSignUpClick }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [view, setView] = useState('roleSelection');


  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };
  
  const handleNextClick = () => {
    if (selectedRole === 'patient') {
      setView('patientSignUp');
    } else if (selectedRole === 'doctor') {
      setView('doctorSignUp');
    }
    // Handle other roles if necessary
  };
  

  return (
    <Box sx={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h6" sx={{ margin: '16px 0' }}>Sign Up</Typography>

      {view === 'roleSelection' && (
        <>
          <Typography variant="subtitle1" sx={{ margin: '8px 0 32px' }}>
            Are you a patient or a doctor?
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <Button 
              variant={selectedRole === 'patient' ? 'contained' : 'outlined'}
              onClick={() => handleRoleSelect('patient')}
              sx={{ width: '48%' }}
            >
              Patient
            </Button>
            <Button 
              variant={selectedRole === 'doctor' ? 'contained' : 'outlined'}
              onClick={() => handleRoleSelect('doctor')}
              sx={{ width: '48%' }}
            >
              Doctor
            </Button>
          </Box>

          <Button 
            variant="contained"
            sx={{ width: '100%', marginBottom: 2 }}
            disabled={!selectedRole}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </>
      )}

      {view === 'patientSignUp' && (
        <div>
          <PatientSignUp />
          {/* JSX for patient sign-up form goes here */}
        </div>
      )}
      {view === 'doctorSignUp' && (
        <div>
          <DoctorSignUp />
          {/* JSX for the doctor sign-up form */}
        </div>
      )}

      <Box sx={{ margin: '16px 0' }}>
        Already have an account? 
        <span onClick={onSignUpClick} style={{ paddingLeft: "4px",color: "blue", cursor: "pointer", textDecoration: "underline" }}>Log in</span>
      </Box>
    </Box>
  );
};

export default SignUpForm;
