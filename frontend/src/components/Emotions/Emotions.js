import React, { useRef, useEffect } from "react";
import "./Emotions.css";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
import useWebSocket from 'react-use-websocket';

function Emotion() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const isWebSocketOpen = useRef(false);

  const runFaceDetectorModel = async () => {
    console.log("FaceDetection Model is Loaded..");

    if (!isWebSocketOpen.current) {
      socketRef.current = new WebSocket('ws://0.0.0.0:8888/api/cv/ws/emotions');
      socketRef.current.onopen = () => {
        console.log("WebSocket is connected.");
        isWebSocketOpen.current = true;
      };

      socketRef.current.onmessage = (event) => {
        const predictions = JSON.parse(event.data);
        const emotionLevels = predictions['emotions'];
        updateEmotionLevels(emotionLevels);
        const ctx = canvasRef.current.getContext("2d");
        requestAnimationFrame(() => { drawMesh(predictions, ctx) });
      };
    }

    // Запуск обнаружения лиц
    setInterval(() => {
      detect();
    }, 500);
  };
  

  const detect = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const imageSrc = webcamRef.current.getScreenshot();
      const apiCall = {
        event: "localhost:subscribe",
        data: { image: imageSrc },
      };

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(apiCall));
      }
    }
  };

  const updateEmotionLevels = (emotionLevels) => {
    Object.keys(emotionLevels).forEach((emotion) => {
      document.getElementById(emotion.charAt(0).toUpperCase() + emotion.slice(1)).value = Math.round(emotionLevels[emotion] * 100);
    });
  };

  useEffect(() => {
    runFaceDetectorModel();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);
  
  return (
    <div className="emotion-app">
      <div className="webcam-container">
        <Webcam
          ref={webcamRef}
          className="webcam"
          videoConstraints={{ width: 900, height: 800 }} // Установка размеров видеопотока
        />
        <canvas
          ref={canvasRef}
          className="canvas"
        />
      </div>
      <div className="prediction-container">
        {['Angry', 'Neutral', 'Happy', 'Fear', 'Surprise', 'Sad', 'Disgust'].map((emotion) => (
          <div key={emotion} className="emotion">
            <label htmlFor={emotion} className={emotion.toLowerCase()}>{emotion}</label>
            <progress id={emotion} value="0" max="100"></progress>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Emotion;
