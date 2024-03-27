// Emotions

import React, { useRef, useEffect } from "react";
import "./Emotions.css";
// import logo from './logo.svg';

// import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
import useWebSocket from 'react-use-websocket';

function Emotion() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // const blazeface = require('@tensorflow-models/blazeface')
  // const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
  //   'ws://127.0.0.1:8000/ws/1',
  //   { share: true }
  // );

  //  Load blazeface
  const runFaceDetectorModel = async () => {

    // const model = await blazeface.load()
    console.log("FaceDetection Model is Loaded..") 
    setInterval(() => {
      // detect(model);
      detect("")
    }, 1000);
 
  }

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      // const face = await net.estimateFaces(video);
      //console.log(face);

      // Websocket
      var socket = new WebSocket('ws://0.0.0.0:8888/api/cv/ws/emotions')
      var imageSrc = webcamRef.current.getScreenshot()
      var apiCall = {
        event: "localhost:subscribe",
        data: { 
          image: imageSrc
        },
      };
      socket.onopen = () => socket.send(JSON.stringify(apiCall))
      // getWebSocket().send(JSON.stringify(apiCall))
      
      // getWebSocket().onmessage 
      socket.onmessage = function(event) {
        var predictions = JSON.parse(event.data)
        document.getElementById("Angry").value = Math.round(predictions['emotions']['angry']*100)
        document.getElementById("Neutral").value = Math.round(predictions['emotions']['neutral']*100)
        document.getElementById("Happy").value = Math.round(predictions['emotions']['happy']*100)
        document.getElementById("Fear").value = Math.round(predictions['emotions']['fear']*100)
        document.getElementById("Surprise").value = Math.round(predictions['emotions']['surprise']*100)
        document.getElementById("Sad").value = Math.round(predictions['emotions']['sad']*100)
        document.getElementById("Disgust").value = Math.round(predictions['emotions']['disgust']*100)

        console.log(predictions)
        // var bbox = predictions[0]["coordinates"]
        // var name = predictions[0]["emotion"]
        // console.log(resp)
        // console.log(bbox)
        // predictions = predictions

        // Get canvas context
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
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 900,
            top:100,
            textAlign: "center",
           
          }}
        />
      
        {/* <img src={logo} 
        className="App-logo" 
        alt="logo"
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          bottom:10,
          left: 0,
          right: 0,
          width: 150,
          height: 150,
        }}
        />    */}
        <div className="Prediction" style={{
          position:"absolute",
          right:100,
          width:500,
          top: 60
        }}>
          <label forhtml="Angry" style={{color:'red'}}>Angry </label>
          <progress id="Angry" value="0" max = "100" >10%</progress>
          <br></br>
          <br></br>
          <label forhtml="Neutral" style={{color:'lightgreen'}}>Neutral </label>
          <progress id="Neutral" value="0" max = "100">10%</progress>
          <br></br>
          <br></br>
          <label forhtml="Happy" style={{color:'orange'}}>Happy </label>
          <progress id="Happy" value="0" max = "100" >10%</progress>
          <br></br>
          <br></br>
          <label forhtml="Fear" style={{color:'lightblue'}}>Fear </label>
          <progress id="Fear" value="0" max = "100" >10%</progress>
          <br></br>
          <br></br>
          <label forhtml="Surprise" style={{color:'yellow'}}>Surprised </label>
          <progress id="Surprise" value="0" max = "100" >10%</progress>
          <br></br>
          <br></br>
          <label forhtml="Sad" style={{color:'gray'}} >Sad </label>
          <progress id="Sad" value="0" max = "100" >10%</progress>
          <br></br>
          <br></br>
          <label forhtml="Disgust" style={{color:'pink'}} >Disgusted </label>
          <progress id="Disgust" value="0" max = "100" >10%</progress>
        </div>

    </div>
  );
}

export default Emotion;