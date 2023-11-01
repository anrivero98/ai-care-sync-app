import React from "react";
import ReactDOM from "react-dom";
import { Router, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import MainComponent from "./mainComponent";
import reportWebVitals from "./reportWebVitals";
import { createHashHistory } from "history";
import { useLocation, useHistory } from "react-router-dom";
import {useEffect } from 'react'
import ZoomVideo from '@zoom/videosdk'
import { useReactMediaRecorder } from "react-media-recorder";

var constraints = { audio: true }


const RecordView = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>
  );
};



/* globals zoomSdk */ 

const KJUR = require('jsrsasign')


function generateSignature(sdkKey, sdkSecret, sessionName, role, sessionKey, userIdentity) {

  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    app_key: sdkKey,
    tpc: sessionName,
    role_type: role,
    session_key: sessionKey,
    user_identity: userIdentity,
    version: 1,
    iat: iat,
    exp: exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
  return sdkJWT
}


console.log(ZoomVideo.checkFeatureRequirements())

const history = createHashHistory();




// const ZoomVideo = window.WebVideoSDK.default


const client = ZoomVideo.createClient()




ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      {/* <App /> */}
      <MainComponent />
      {/* <TestApp /> */}
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);



function TestApp() {

  useEffect(() => {
    let stream
    client.init('en-US', 'CDN').then(() => {

      console.log("INit")

      const stream = client.getMediaStream();
      
      client.join('test-meeting', generateSignature('ajro4ZZIRrmT2-TXVbzpxQ', 'HSjsexLP9uiSDPg98cwpUbm1ZpvBFYixiuSc', 'test-meeting', 1, 'sessionKeyRandom', 'jesh'), 'jesh').then(() => {
        try {
          
          // stream = client.getMediaStream()
          const liveTranscriptionTranslation = client.getLiveTranscriptionClient()
          liveTranscriptionTranslation.startLiveTranscription();
          client.on(`caption-message`, (payload) => {
            console.log("SUCCESS")
            console.log(payload)
            console.log(`${payload.displayName} said: ${payload.text}`);
          });
          
        }
        catch(err) {
          
        }

        
      }).catch((error) => {
        console.log(error)
      })

    }).catch((error) => {
      console.log(error)
    })

  })
  return (
    <div>
      <h2>Hello</h2>
    </div>
  )

}






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
