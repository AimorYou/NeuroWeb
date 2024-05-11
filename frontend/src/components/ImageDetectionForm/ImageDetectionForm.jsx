import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './ImageDetectionForm.css';
import Webcam from 'react-webcam';
import axios from 'axios';
import { drawMesh } from "./utilities";

const ImageDetectionForm = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [forms, setForms] = useState([{ id: 1, name: 'Имя 1', photos: [] }]);
  const [formIdCounter, setFormIdCounter] = useState(2);
  const [showCamera, setShowCamera] = useState(false);
  const [checked, setChecked] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [classMapping, setClassMapping] = useState({});
  const [freezeCamera, setFreezeCamera] = useState(false);
  const [socket, setSocket] = useState(null);
  const [videoStopped, setVideoStopped] = useState(false);
  const [recognizedPeople, setRecognizedPeople] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploadedTxtFiles, setUploadedTxtFiles] = useState([]);
  const [classNames, setClassNames] = useState('');

  const handleSavePhotos = (formId, photos) => {
    setUploadedPhotos((prevPhotos) => [
      ...prevPhotos,
      { formId, photos },
    ]);
  };

  const handleSaveTxtFiles = (formId, txtFiles) => {
    setUploadedTxtFiles((prevTxtFiles) => [
      ...prevTxtFiles,
      { formId, txtFiles },
    ]);
  };




  const deletePhoto = (formId, photoIndex) => {
    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          form.photos.splice(photoIndex, 1);
        }
        return form;
      });
    });
  };


  const runFaceDetectorModel = async () => {

    // const model = await blazeface.load()
    console.log("FaceDetection Model is Loaded..")
    setInterval(() => {
      // detect(model);
      detect("")
    }, 800);

  }

  const detect = async () => {
    if (
      !freezeCamera &&
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4 &&
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      const classNamesParam = classNames.split(',').map(name => `names=${name.trim()}`).join('&');

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      var imageSrc = webcamRef.current.getScreenshot()
      var apiCall = {
        event: "localhost:subscribe",
        data: {
          'image': imageSrc
        },
      };
      socket.send(JSON.stringify(apiCall));
      // getWebSocket().send(JSON.stringify(apiCall))

      // getWebSocket().onmessage 
      socket.onmessage = function (event) {
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
      };

    }
  };

  function dataURItoBlob(dataURI) {
    const splitDataURI = dataURI.split(',');
    const type = splitDataURI[0].split(':')[1].split(';')[0];
    const byteString = atob(splitDataURI[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: type });
  }


  const sendJSON = async () => {

    const formData = new FormData();

    uploadedPhotos.forEach((uploadedPhoto) => {
      const blob = dataURItoBlob(uploadedPhoto.photos.src);
      const file = new File([blob], `${uploadedPhoto.photos.name}`, { type: 'image/jpg' });
      formData.append(`files`, file);
    });

    uploadedTxtFiles.forEach((uploadedTxtFile) => {
      const blob = new Blob([uploadedTxtFile.txtFiles.content], { type: 'text/plain' });
      const file = new File([blob], `${uploadedTxtFile.txtFiles.name}`, { type: 'text/plain' });
      formData.append(`files`, file);
    });

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const classNamesParam = classNames.split(',').map(name => `names=${name.trim()}`).join('&');

    console.log(classNamesParam)
    // Отправляем данные на бэкенд
    const apiUrl = `http://0.0.0.0:8888/api/cv/train/detection/train-model?user_id=1&${classNamesParam}`; // как посылать uid
    try {

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log('Response:', response.data);

      setShowCamera(true);
      const socket = new WebSocket(`ws://0.0.0.0:8888/api/cv/train/ws/detection/predict/1`)
      setSocket(socket);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    if (webcamRef.current) {
      if (videoStopped) {
        webcamRef.current.video.pause(); // Приостанавливаем видео
      } else {
        webcamRef.current.video.play(); // Запускаем видео
      }
    }
  }, [videoStopped]);

  useEffect(() => {
    if (showCamera) {
      runFaceDetectorModel();
    }
  }, [showCamera], []);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const disableButtons = uploadedPhotos.length < 1 || uploadedTxtFiles.length < 1 || classNames.length < 1;

  return (
    <React.Fragment>
      <div className='text-to-show'>
        Функционал обучения собственных моделей на мобильных устройствах не доступен. Переключитесь, пожалуйста, на ПК.
      </div>
      <div className="hide">
        <div className='horizontal'>
          <div>
            {forms.map(form => (
              <div key={form.id}>
                {/* <Photo photos={form.photos} formId={form.id} deletePhoto={deletePhoto} /> */}
                <Camera formId={form.id} formName={form.name} handleSavePhotos={handleSavePhotos} handleSaveTxtFiles={handleSaveTxtFiles} setClassNames={setClassNames} />
              </div>
            ))}
          </div>
          <div className='train-model-card'>
            <div className='heading'>Обучение</div>
            <button className='train-model-btn' onClick={sendJSON} disabled={disableButtons}>Обучить модель</button>
          </div>
          <div className='preview-model-card'>
            <div className='preview'>Превью
              <button className='export-model-btn'><IosShareIcon />Экспортировать модель</button>
            </div>
            <div className='horizontal-line' />
            {showCamera && (
              <div>
                <Webcam
                  ref={webcamRef}
                  style={{
                    position: "relative",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 600,
                    top: 0,
                    textAlign: "center",
                    zIndex: 9, 
                    width: 400,
                    height: 300,
                  }}
                />

                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 1060,
                    right: 0,
                    top: 50,
                    textAlign: "center",
                    zIndex: 9,
                    width: 380,
                    height: 280,
                  }}
                />

              </div>
            )}
            {!showCamera && (
              <div className='preview-text'>Вы должны обучить модель слева, прежде чем сможете просмотреть ее здесь.</div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImageDetectionForm;
