import  styles from "./chatAICont.module.css";
import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { TextField, List, ListItem, ListItemText } from '@mui/material';
import { borders } from '@mui/system';


import "material-icons/iconfont/material-icons.css";
import ChatAITile from "./chatAITile";
import QuestionTile from "./questionTile"
import DoctorTile from "./doctorTile";



const ChatAICont = (props) => {

    let textArr = [
        "Hey there! I'm CareSync, your AI sidekick. I'm here to help you get the most out of your appointment. I'll keep track of the conversation, highlight important words, take notes, and even suggest relevant questions to ask the doctor!",
        "You can ask me anything about what's been discussed in the appointment so far, or about general knowledge.",
    ];

    const {questionArr} = props

    let doctorArr = [
      "I would recommend you take this!"

    ];
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

  return (
    <div className={styles.outerContainer}>
      
        <div className={styles.compContainer}>
        <div>{textArr.map((text) => (
              <ChatAITile text={text} />
          ))}</div>
        
        <div>{questionArr.map((text) => (
            <QuestionTile text={text} />
        ))}</div>




              <List>
              <div>{items.map((text) => (
              <ChatAITile text={text} />
          ))}</div>
              </List>
          
          </div>
        
        <div>
        <TextField
        InputProps={{
            style: {
              borderRadius: "120px",
            }
          }}
            sx={{marginTop:'15px', width: '30vw'}}
            label="Ask the AI..."
            variant="outlined"
            fullWidth
            
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyPress}
        />
        
        </div>
    </div>
  );
};

export default ChatAICont;