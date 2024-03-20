import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UploadAltIcon from '@mui/icons-material/Upload';
import "./StopWatch.css";
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { VoiceRecorder } from 'react-voice-recorder-player';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './Camera.css';
import { ReactMic } from 'react-mic';
import Dropdown from 'react-multilevel-dropdown';

const CameraForm = ({formId, delForm}) => {
  const webcamRef = useRef(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [captureInterval, setCaptureInterval] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
/*
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder
  } = useAudioRecorder();

  useEffect(() => {
    if (!recordingBlob) return;

    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [recordingBlob])

    const recorderControls = useAudioRecorder(
      {
        noiseSuppression: true,
        echoCancellation: true,
      },
      (err) => console.table(err) // onNotAllowedOrFound
    );
    const addAudioElement = (blob) => {
      const url = URL.createObjectURL(blob);
      const audio = document.createElement('audio');
      audio.src = url;
      audio.controls = true;
      document.body.appendChild(audio);
    };
*/

  const deletePhoto = (index) => {
    const updatedPhotos = [...capturedPhotos];
    updatedPhotos.splice(index, 1);
    setCapturedPhotos(updatedPhotos);
  };
//TODO HandleSavePhotos можно добавить отправку на сервер

const jsonArray = []
  const forms = {formId : [capturedPhotos]}
  const jsonObj = {
    classes: [forms]
  }
  jsonArray.push(jsonObj)

  const handleSavePhotos = () => {
    if (capturedPhotos.length > 0) {
      console.log('Сохранение фотографий:', jsonArray);
    } else {
      console.log('Фотографии не были захвачены');
    }
  };

const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };

const [recording, setRecording] = useState(false);
const [audioURL, setAudioURL] = useState(false);

const onStop = (blob) => {
  console.log(blob)
  setAudioURL(blob.blobURL)
}

const startHandle = () => {
  setRecording(true)
  setTime(0)
  setIsRunning(true)
}
const stopHandle = () => {
  setRecording(false)
  setIsRunning(false)
}

const clearHandle = () => { }


  const MenuBar = () => {
    return (
      <div className='more-btn'>
        <div>
        <Dropdown
          title=<MoreVertIcon/>
          className="more-btn">
              <Dropdown.Item  onClick={() => delForm(formId)} >
                Удалить класс
              </Dropdown.Item>
        </Dropdown>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="horizontal">
      <div className="card">
        <div className="class-text">
          Класс {formId}
        </div>
        <MenuBar/>
        <div class="horizontal-line"></div>
        <div class="horizontal-btns">
          <button className='camera-upload-photo' onClick={() => setShowCamera(!showCamera)}><MicIcon/></button>
          <button className='camera-upload-photo' onClick={handleSavePhotos}><UploadAltIcon/></button>
        </div>
        {showCamera && (
          <div>
          <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
    </div>
          <ReactMic className="react-mic"
          record={recording}
          onStop={onStop}
          />
          {!recording ? <button className={'btn'} onClick={startHandle}>
              Начать запись
            </button> : <button className={'btn'} onClick={stopHandle}>
              Остановить запись
            </button>}
            <div>
              {audioURL ? <audio controls src={audioURL} /> : null}
              </div>
        </div>
        )}
        <div className="photo-container">
          {capturedPhotos.map((photo, index) => (
            <div key={photo.id} className="photo-item">
              <img src={photo.photo} alt={`Photo ${index}`} />
              {/* <button className='btn' onClick={() => deletePhoto(index)}>Delete</button> */}
            </div>
          ))}
        </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default CameraForm;
