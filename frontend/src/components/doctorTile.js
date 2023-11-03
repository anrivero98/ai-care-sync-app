import styles from "./doctorTile.module.css";
import { useState } from "react";
import "material-icons/iconfont/material-icons.css";
import React from "react";

const DoctorTile = (props) => {
  const { text } = props;
  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatBoxTop}>
        <div className={styles.doctorHolder}>
        <span className="material-icons" style={{ color: "black" }}>
            local_hospital
            </span>
        </div>
        <div className={styles.chatTextHolder}>Doctor</div>
      </div>
      <div className={styles.message}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default DoctorTile;

