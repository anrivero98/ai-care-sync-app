import styles from "./questionTile.module.css";
import { useState } from "react";
import "material-icons/iconfont/material-icons.css";
import React from "react";

const QuestionTile = (props) => {
  const { text } = props;
  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatBoxTop}>
        <div className={styles.questionHolder}>
            <span className="material-icons" style={{ color: "black" }}>
            question_mark
            </span>
        </div>
        <div className={styles.chatTextHolder}>Questions</div>
      </div>
      <div className={styles.message}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default QuestionTile;

