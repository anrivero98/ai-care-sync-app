 import styles from "../../styles/chat.module.css"
import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { TextField, List, ListItem, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, purple } from '@mui/material/colors';
import "material-icons/iconfont/material-icons.css";
import ChatAI from "./chatAITile";
import ChatAICont from "./chatAI"
import DoctorTile from "../doctorTile";


let doctorArr = [
  "I would recommend you take this!"

];
let questionArr = [

]

// function mergeUniqueQuestions(originalQuestions, newQuestions) {
//   newQuestions.forEach(question => {
//     if (!originalQuestions.includes(question)) {
//       originalQuestions.push(question);
//     }
//   });
//   return originalQuestions;
// }

// function canConvertStringToArray(str) {
//   // Check if the string starts with "questions = [" and ends with "]"
//   if (!str.trim().startsWith('questions = [') || !str.trim().endsWith(']')) {
//     return false;
//   }

//   // Check if there is at least one question inside the brackets
//   const innerContent = str.trim().slice(14, -1).trim();
//   if (!innerContent.startsWith('"') || !innerContent.endsWith('"')) {
//     return false;
//   }

//   return true; // The string passed the basic structure checks
// }

// function convertStringToArray(str) {
//   // Check if the string can be converted
//   if (!canConvertStringToArray(str)) {
//     return []
//   }

//   // Proceed with the conversion
//   let trimmedString = str.trim().slice(14, -1);

//   // Split the string by '","' to get an array of question strings
//   let questionsArray = trimmedString.split('","');

//   // Trim and fix quotes for each question
//   questionsArray = questionsArray.map(question => question.trim());

//   // Handle the first and last element separately to remove the leading and trailing quote
//   questionsArray[0] = questionsArray[0].slice(1);
//   let lastQuestionIndex = questionsArray.length - 1;
//   questionsArray[lastQuestionIndex] = questionsArray[lastQuestionIndex].slice(0, -1);

//   return questionsArray;
// }


const Chat = (props) => {

  const {generated_questions, transcriptList, random} = props

  
  
  

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

  const [selectedOption, setSelectedOption] = useState(null);


  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && text.trim() !== '') {
      setItems([...items, text]);
      setText('');
    }
  };

  const handleOptionChange = (event, newOption) => {
    setSelectedOption(newOption);
  };
  console.log("before length check: ", generated_questions)
  if (generated_questions.length > 0){
    const questionsRegex = /Question:\s*(.*)/;
    const match = generated_questions.trim().match(questionsRegex);
    const currentQuestion = match ? match[1].trim().toLowerCase() : '';
    if (currentQuestion != ''){
      if (!questionArr.includes(currentQuestion)){
        questionArr.push(currentQuestion)
      }
      
    } 
  }
  
  // if (generated_questions.length > 0)
  // {
  //   const questionsRegex = /Questions:\s*(.*)/;
  //   const match = generated_questions.trim().match(questionsRegex);
  //   const questions_arr = match ? match[1].trim().toLowerCase() : '';
  //   for (const q of questions_arr.split('?')){
  //     if (!text.includes(q))
  //     {
  //       text.push(q)
  //     }
  //   }
  
  
  

  // if (generated_questions.length > 0) {
  //   const new_questions = convertStringToArray(generated_questions)
  //   let unique_questions = mergeUniqueQuestions(questionArr, new_questions)
  //   for (q of unique_questions){
  //     questionArr.push(unique_questions)
  //   }

  //   }
  // console.log('full text: ', text)
  
  return (
    <div className={styles.chatWindow}>
      <div className={styles.iconContainer}>
        <span className="material-icons" style={{ color: "black" }}>
          keyboard_arrow_left
        </span>
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

          <div className={styles.logotext}>CareSync</div>
        </div>
        <span className="material-icons" style={{ color: "black" }}>
          more_horiz
        </span>
      </div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
      <ThemeProvider theme={theme}>

      <ToggleButtonGroup

        value={selectedOption}
        exclusive
        onChange={handleOptionChange}
        aria-label="text selection"
      >
        <ToggleButton value="option1" aria-label="Option 1" style={{ padding: '10px', width: '70px' }}>
          AI Chat
        </ToggleButton>
        <ToggleButton value="option2" aria-label="Option 2" style={{ width: '70px' }}>
          Transcript
        </ToggleButton>
        <ToggleButton value="option3" aria-label="Option 3" style={{ padding: '10px', width: '70px' }}>
          Smart Notes
        </ToggleButton>
      </ToggleButtonGroup>
      </ThemeProvider>

      {selectedOption && (
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          {selectedOption === 'option1' && <ChatAICont questionArr = {questionArr}/>}
          {selectedOption === 'option2' && <div>{transcriptList.map((item) => ( 
            <DoctorTile text={item} />
            
        ))}</div> }
          {selectedOption === 'option3' && 'Text for Smart Notes is displayed.'}
        </Typography>
      )}
    </div>
    </div>
  );
}
export default Chat;

