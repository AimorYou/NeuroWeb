import React, { useRef, useEffect } from "react";
import "./Detection.css";

import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

function Detection() {
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



      var socket = new WebSocket('ws://127.0.0.1:8000/ws/1')
      var imageSrc = webcamRef.current.getScreenshot()
      var apiCall = {
        event: "localhost:subscribe",
        data: {
          image: imageSrc
        },
      };
      socket.onopen = () => socket.send(JSON.stringify(apiCall))

     

      socket.onmessage = function(event) {
        var predictions = JSON.parse(event.data)
        var bbox = predictions[0]["coordinates"]
        var name = predictions[0]["cls"]
        const ctx = canvasRef.current.getContext("2d");
        requestAnimationFrame(()=>{drawMesh(predictions, ctx)});
      }
    }
  };

  useEffect(()=>{runFaceDetectorModel()}, []);
  return (
    <div className="App">
      <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
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
            right: 600,
            top:20,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      <header className="App-header">
        <div className="Prediction" style={{
          position:"absolute",
          right:100,
          width:500,
          top: 60
        }}>
        </div>
      </header>
    </div>
  );
}

export default Detection;