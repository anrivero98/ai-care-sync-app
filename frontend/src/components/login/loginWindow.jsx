// import styles from "../../styles/chat.module.css"
import styles from "../../styles/chat.module.css"
import React, { useState } from 'react';
    // import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "material-icons/iconfont/material-icons.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

let doctorArr = [
  "I would recommend you take this!"
];

let questionArr = [

]



const LoginWindow = ({handleUserLogin}) => {
  const theme = createTheme({
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: '#3048D3', // Blue color for the active state
              color: '#fff', // Text color for the active state
            },
          },
        },
      },
    },
  });

  // State to manage which form is active ('SignIn' or 'SignUp')
  const [activeForm, setActiveForm] = useState('SignIn');
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLoginAttempt = (email, password) => {
    handleUserLogin(email, password);
  };

  const toggleForm = (props) => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.iconContainer}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h6" component="h2" sx={{ marginRight: 1 }}>
        Welcome to
      </Typography>
        <div className={styles.logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
          >
            <path
              d="M13.9595 0.00012207H4.39697C2.06702 0.00012207 0.178223 1.88892 0.178223 4.21887V13.7814C0.178223 16.1113 2.06702 18.0001 4.39697 18.0001H13.9595C16.2894 18.0001 18.1782 16.1113 18.1782 13.7814V4.21887C18.1782 1.88892 16.2894 0.00012207 13.9595 0.00012207Z"
              fill="#3048D3"
            />
            <path
              d="M9.67829 3.00012C11.8978 3.00012 13.8358 4.20555 14.8737 5.99734L14.8636 5.9801L12.2521 7.48376C11.7376 6.61263 10.7943 6.02469 9.71233 6.01263L9.67829 6.01244C8.02822 6.01244 6.69054 7.35006 6.69054 9.00006C6.69 9.52012 6.82586 10.0312 7.08458 10.4824C7.59957 11.3814 8.56766 11.9879 9.67829 11.9879C10.7957 11.9879 11.7693 11.3737 12.2817 10.4651L12.2693 10.4869L14.8768 11.9975C13.8502 13.7741 11.9389 14.9758 9.74511 14.9997L9.67829 15.0001C7.45165 15.0001 5.50822 13.7872 4.47288 11.986C3.96742 11.1066 3.67822 10.0872 3.67822 9.00006C3.67822 5.68642 6.36445 3.00012 9.67829 3.00012Z"
              fill="white"
            />
          </svg>
        </div>
        <Typography variant="h6" component="h2" sx={{ paddingLeft: 1 }}> {/* Increased padding on the left */}
        CareSync
      </Typography>
    </Box>

      </div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
      {showSignUp ? (
        <SignUpForm onSignUpClick={toggleForm} />
      ) : (
        <SignInForm onSignUpClick={toggleForm} onLoginAttempt={handleLoginAttempt} />
      )}

    </div>
    </div>
  );
}
export default LoginWindow;

