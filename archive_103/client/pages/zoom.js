import { useEffect } from "react";
import MeetingStyles from "../src/styles/zoom.module.css";
import { useRouter } from "next/router";

const axios = require("axios");

const Meeting = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      try {
        const ZoomEmbed = (await import("@zoomus/websdk/embedded")).default;
        const client = ZoomEmbed.createClient();
        
        let meetingSDKElement = document.getElementById("meetingSDKElement");
        client.init({
          language: "en-US",
          zoomAppRoot: meetingSDKElement,
        });

        let payload = router.query;
        const { data } = await axios({
          url: "/api/Zoom",
          method: "post",
          data: payload,
        });

        console.log("HMM")
        console.log(data)

        client.join({
          meetingNumber: payload.meetingNumber,
          signature: data.signature,
          sdkKey: data.sdkKey,
          userName: payload.userName,
          passWord: payload.password,
          tk: "",
        });
        
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    
    fetchData();
  }, [router.isReady, router.query]);
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
