import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import "material-icons/iconfont/material-icons.css";
import ChatAI from "./chatAITile";


const ToggleButtonComponent = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  let text = [
    "Hey there! I'm CareSync, your AI sidekick. I'm here to help you get the most out of your appointment. I'll keep track of the conversation, highlight important words, take notes, and even suggest relevant questions to ask the doctor!",
    "You can ask me anything about what's been discussed in the appointment so far, or about general knowledge.",
    "Nothing much, you?",
    "nah im just chillin",
  ];

  const handleOptionChange = (event, newOption) => {
    setSelectedOption(newOption);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <ToggleButtonGroup
        value={selectedOption}
        exclusive
        onChange={handleOptionChange}
        aria-label="text selection"
      >
        <ToggleButton value="option1" aria-label="Option 1" style={{ padding: '10px 16px', width: '100px' }}>
          AI Chat
        </ToggleButton>
        <ToggleButton value="option2" aria-label="Option 2" style={{ padding: '10px 16px', width: '100px' }}>
          Transcript
        </ToggleButton>
        <ToggleButton value="option3" aria-label="Option 3" style={{ padding: '10px 16px', width: '100px' }}>
          Smart Notes
        </ToggleButton>
      </ToggleButtonGroup>

      {selectedOption && (
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          {selectedOption === 'option1' && <div>{text.map((text) => (
        <ChatAI text={text} />
      ))}</div>}
          {selectedOption === 'option2' && 'Text for Option 2 is displayed.'}
          {selectedOption === 'option3' && 'Text for Option 3 is displayed.'}
        </Typography>
      )}
    </div>
  );
};

export default ToggleButtonComponent;