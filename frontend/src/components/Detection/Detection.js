import React, { useRef, useEffect } from "react";
import "./Detection.css";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  const runFaceDetectorModel = async () => {
    console.log("FaceDetection Model is Loaded..");

    // Open WebSocket connection once
    socketRef.current = new WebSocket('ws://0.0.0.0:8888/api/cv/ws/detection');
    socketRef.current.onopen = () => {
      console.log("WebSocket connection established.");
      setInterval(() => {
        detect();
      }, 2000);
    };

    socketRef.current.onmessage = (event) => {
      console.log(event.data);
      try {
        const predictions = JSON.parse(event.data);
        const ctx = canvasRef.current.getContext("2d");
        requestAnimationFrame(() => { drawMesh(predictions, ctx) });
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const detect = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const imageSrc = webcamRef.current.getScreenshot();
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        const apiCall = {
          event: "localhost:subscribe",
          data: {
            image: imageSrc
          },
        };
        socketRef.current.send(JSON.stringify(apiCall));
      }
    }
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
    <div className="App">
      <header className="App-header">
        <h1>Детекция</h1>
        <div className="camera-container">
          <Webcam
            className="Webcam"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <canvas
            ref={canvasRef}
            className="Canvas"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
