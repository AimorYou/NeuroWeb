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
      <Webcam className="Webcam"
          ref={webcamRef}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 600,
            top:20,
            textAlign: "center",
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 600,
            top:20,
            textAlign: "center",
          }}
        />
        <div className="Prediction" style={{
          position:"absolute",
          right:100,
          width:500,
          top: 60
        }}>
        </div>
    </div>
  );
}

export default Detection;