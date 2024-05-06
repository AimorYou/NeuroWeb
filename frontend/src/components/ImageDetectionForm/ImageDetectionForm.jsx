import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './ImageDetectionForm.css';
import Webcam from 'react-webcam';
import axios from 'axios';

const ImageDetectionForm = () => {
  const webcamRef = useRef(null);
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

  const addForm = () => {
    const newForm = { id: formIdCounter, name: `Имя ${formIdCounter}`, photos: [] };
    setFormIdCounter(formIdCounter + 1);
    setForms(prevForms => [...prevForms, newForm]);
  };

  const deleteForm = formId => {
    setForms(prevForms => prevForms.filter(form => form.id !== formId));
  };

  const renameForm = (formId, newName) => {
    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          return { ...form, name: newName };
        }
        return form;
      });
    });
  };


  const TakePhoto = formId => {
    const capturedPhoto = webcamRef.current.getScreenshot();

    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          form.photos.push(capturedPhoto);
        }
        return form;
      });
    });
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

  const toggleFreezeCamera = () => {
    setFreezeCamera(prevState => !prevState);
    if (socket) {
      socket.close();
      setSocket(null);
    }
    // Останавливаем видео, если оно не остановлено; иначе, запускаем его
    setVideoStopped(prevState => !prevState);
  };

  const runFaceDetectorModel = async () => {

    // const model = await blazeface.load()
    console.log("FaceDetection Model is Loaded..")
    setInterval(() => {
      // detect(model);
      detect("")
    }, 1000);

  }

  const detect = async () => {
    if (
      !freezeCamera &&
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

      var socket = new WebSocket('ws://0.0.0.0:8888/api/cv/train/ws/face-recognition/predict/1')
      var imageSrc = webcamRef.current.getScreenshot()
      var apiCall = {
        event: "localhost:subscribe",
        data: {
          'image': imageSrc,
          'class_mapping': classMapping
        },
      };
      socket.onopen = () => socket.send(JSON.stringify(apiCall))
      // getWebSocket().send(JSON.stringify(apiCall))

      // getWebSocket().onmessage 
      socket.onmessage = function (event) {
        var predictions = JSON.parse(event.data);
        var recognizedPeople = predictions.recognized_people;

        if (predictions.recognized_flg && recognizedPeople.length > 0) {
          setRecognizedPeople(recognizedPeople);
        } else {
          setRecognizedPeople([]);
        }
      };



    }
  };




  const sendJSON = async () => {
    // Формируем данные для отправки на бэкенд
    const formData = new FormData();

    console.log(uploadedPhotos)
    console.log(uploadedTxtFiles)

    // Добавляем загруженные фотографии
    uploadedPhotos.forEach((uploadedPhoto) => {
      uploadedPhoto.photos.forEach((photo) => {
        formData.append(`photos_${uploadedPhoto.formId}[]`, photo);
      });
    });

    // Добавляем загруженные текстовые файлы
    uploadedTxtFiles.forEach((uploadedTxtFile) => {
      uploadedTxtFile.txtFiles.forEach((txtFile) => {
        formData.append(`txt_files_${uploadedTxtFile.formId}[]`, txtFile);
      });
    });

    console.log(formData)

    // Отправляем данные на бэкенд
    const apiUrl = 'http://0.0.0.0:8888/api/cv/train/face-recognition/train-model?user_id=1'; // как посылать uid
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      if (response.data && response.data.class_mapping) {
        console.log('Updating classMapping:', response.data.class_mapping); // Log before updating
        setClassMapping(response.data.class_mapping);
      } else {
        console.log('Error: No class mapping received');
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => { runFaceDetectorModel(); }, [classMapping]);

  useEffect(() => {
    if (webcamRef.current) {
      if (videoStopped) {
        webcamRef.current.video.pause(); // Приостанавливаем видео
      } else {
        webcamRef.current.video.play(); // Запускаем видео
      }
    }
  }, [videoStopped]);

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
                <Camera formId={form.id} formName={form.name} renameForm={renameForm} delForm={deleteForm} handleSavePhotos={handleSavePhotos} handleSaveTxtFiles={handleSaveTxtFiles} TakePhoto={() => TakePhoto(form.id)} />
              </div>
            ))}
          </div>
          <div className='train-model-card'>
            <div className='heading'>Обучение</div>
            <button className='train-model-btn' onClick={sendJSON}>Обучить модель</button>
          </div>
          <div className='preview-model-card'>
            <div className='preview'>Превью
              <button className='export-model-btn'><IosShareIcon />Экспортировать модель</button>
            </div>
            <div className='horizontal-line' />
            {showCamera && (
              <div>
                <label className="toggle">
                  <span className="toggle-label">{freezeCamera ? "Выкл" : "Вкл"}</span>
                  <input className="toggle-checkbox" type="checkbox" onClick={toggleFreezeCamera} />
                  <div className="toggle-switch"></div>
                </label>
                <Webcam ref={webcamRef} className="webcam" /> {/* Добавление класса для камеры */}
                <div className="names-text">
                <label style={{ color: 'white' }}>Распознанные люди:</label>
                    {recognizedPeople.length > 0 ? (
                      <ul>
                        {recognizedPeople.map((person, index) => (
                          <div key={index}>{person}</div>
                        ))}
                      </ul>
                    ) : (
                      <div>Никого</div>
                    )}

                  </div>

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