import React, { useRef, useEffect } from "react";
import "./Detection.css";

import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFaceDetectorModel = async () => {
    console.log("FaceDetection Model is Loaded..")
    setInterval(() => {
      detect("")
    }, 2000);

  }

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {

      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;


      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;


      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;



      var socket = new WebSocket('ws://0.0.0.0:8888/api/cv/ws/detection')
      var imageSrc = webcamRef.current.getScreenshot()
      var apiCall = {
        event: "localhost:subscribe",
        data: {
          image: imageSrc
        },
      };
      socket.onopen = () => socket.send(JSON.stringify(apiCall))

     

      socket.onmessage = function(event) {
        console.log(event.data)
        try {
          var predictions = JSON.parse(event.data)
          var bbox = predictions[0]["coordinates"]
          var name = predictions[0]["cls"]
          const ctx = canvasRef.current.getContext("2d");
          requestAnimationFrame(() => { drawMesh(predictions, ctx) });
        } catch (error) {
          console.log(error)
        }
      }
    }
  };

  useEffect(()=>{runFaceDetectorModel()}, []);
  return (
    <div className="App">
      <Webcam className="Webcam"
          ref={webcamRef}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 600,
            top:20,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 760,
            top:120,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
    </div>
  );
}

export default App;