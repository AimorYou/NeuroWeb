import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './Classification.css';

function getBase64StrFromUrl(dataUrl) {
  const prefix = "base64,";
  const sliceIndex = dataUrl.indexOf(prefix);
  if (sliceIndex === -1) throw new Error("Expected base64 data URL");
  return dataUrl.slice(sliceIndex + prefix.length);
}

function decode(base64Str) {
  const binString = window.atob(base64Str);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

function WebcamCapture() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const [socketUrl, setSocketUrl] = useState('ws://0.0.0.0:8888/api/cv/ws/classification');

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(() => sendMessage(webcamRef.current.getScreenshot()), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  async function capture() {
    const imageSrc = webcamRef.current.getScreenshot();
  }

  return (
    <div className='classification-wrapper'>
      <h1>Классификация</h1>
      <div className='camera-container'>
        <Webcam
          
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <canvas ref={canvasRef} className='canvas' />
      </div>
      <button
        className="train-model-btn"
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Классифицировать
      </button>
      {lastMessage ? (
        <span className='object-is'>
          Объект - {lastMessage.data}
        </span>
      ) : null}
    </div>
  );
}

export default WebcamCapture;
