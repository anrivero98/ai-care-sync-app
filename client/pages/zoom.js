import { useEffect } from "react";
import MeetingStyles from "../src/styles/zoom.module.css";
import router from "next/router";
import middleWare from "../middleware";
const axios = require("axios");

const Meeting = () => {
  useEffect(() => {
    return async () => {
      new Promise(async (resolve, reject) => {
        const ZoomEmbed = await (
          await import("@zoomus/websdk/embedded")
        ).default;

        resolve(ZoomEmbed.createClient());
      })
        .then(async (client) => {
          let meetingSDKElement = document.getElementById("meetingSDKElement");

          client.init({
            language: "en-US",
            zoomAppRoot: meetingSDKElement,
          });

          let payload = router.query;
          const { data } = await axios({
            url: middleWare,
            method: "post",
            data: payload,
          });

          client.join({
            meetingNumber: payload.meetingNumber,
            signature: data.signature,
            sdkKey: data.sdkKey,
            userName: payload.userName,
            tk: "",
          });
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    };
  }, []);
  return (
    <div className={MeetingStyles.container}>
      <div
        className={MeetingStyles.meetingSDKElement}
        id="meetingSDKElement"
      ></div>
      <div className={MeetingStyles.content}>Content</div>
    </div>
  );
};

Meeting.displayName = "Zoom Component View";

export default Meeting;
