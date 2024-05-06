import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './ClassesForm.css';
import Webcam from 'react-webcam';
import axios from 'axios';

const ClassesForm = () => {
  const webcamRef = useRef(null);
  const [forms, setForms] = useState([{ id: 1, name: 'Класс 1', photos: [] }, { id: 2, name: 'Класс 2', photos: [] }]);
  const [formIdCounter, setFormIdCounter] = useState(3);
  const [showCamera, setShowCamera] = useState(false);
  const [checked, setChecked] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [classMapping, setClassMapping] = useState({});
  const [freezeCamera, setFreezeCamera] = useState(false);
  const [socket, setSocket] = useState(null);
  const [videoStopped, setVideoStopped] = useState(false);


  const addForm = () => {
    const newForm = { id: formIdCounter, name: `Класс ${formIdCounter}`, photos: [] };
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

  const detect = async() => {
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

      var socket = new WebSocket('ws://0.0.0.0:8888/api/cv/train/ws/classification/predict/1')
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
      socket.onmessage = function(event) {
        var predictions = JSON.parse(event.data)
        forms.forEach(form => {
          var element = document.getElementById(form.name);
          if (element) {
            element.value = Math.round(predictions[form.name]*100);
          } else {
            console.error(`Element with id ${form.name} not found`);
          }
        });
        console.log(predictions);
      }
      
    }
  };

  const classPhotos = {};
  const handleSavePhotos = (formId, photos) => {
    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          form.photos = photos.map(photo => photo.photo);
        }
        return form;
      });
    });

    // Log forms with photos for testing
    console.log(forms);
  };


  const sendJSON = async() => {
    const classPhotos = forms.reduce((accumulator, form) => {
      accumulator[form.name] = form.photos;
      return accumulator;
    }, {});
    
    const obj = { classes: classPhotos};
    const json = JSON.stringify(obj, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'captured_photos.json';
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);

    // Send classPhotos to the server or further processing
    console.log(classPhotos);
    const apiUrl = 'http://0.0.0.0:8888/api/cv/train/classification/train-model?user_id=1'; // как посылать uid

      try {
        // Make a POST request to your backend server with the JSON data
        const response = await axios.post(apiUrl, blob, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log('Response:', response.data);
        if (response.data && response.data.class_mapping) {
          console.log('Updating classMapping:', response.data.class_mapping); // Log before updating
          setClassMapping(response.data.class_mapping)
        } else {
          console.log('Error: No class mapping received');
        }
        setShowCamera(true)
      } catch (error) {
        console.error('Error:', error);
      }
      
      
  };

  useEffect(()=>{runFaceDetectorModel()}, [classMapping]);
  useEffect(() => {
    if (webcamRef.current) {
      if (videoStopped) {
        webcamRef.current.video.pause(); // Приостанавливаем видео
      } else {
        webcamRef.current.video.play(); // Запускаем видео
      }
    }
  }, [videoStopped]);

  const disableButtons = forms.length < 2 || forms.some(form => form.photos.length === 0);

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
          <Camera formId={form.id} formName={form.name} renameForm={renameForm} delForm={deleteForm} handleSavePhotos={handleSavePhotos} TakePhoto={() => TakePhoto(form.id)}/>
        </div>
      ))}
      <button className='add-form-btn' onClick={addForm}>Добавьте класс</button>
      </div>
      <div className='train-model-card'>
        <div className='heading'>Обучение</div>
        <button className='train-model-btn' onClick={sendJSON} disabled={disableButtons}>Обучить модель</button>
      </div>
          <div className='preview-model-card'>
              <div className='preview'>Превью
              <button className='export-model-btn' disabled={classPhotos.length > 0 ? true : false}><IosShareIcon/>Экспортировать модель</button>
              </div>
                <div className='horizontal-line' />
                {showCamera && (
                  <div>
                    <label className="toggle">
                        <span className="toggle-label">{freezeCamera ? "Выкл" : "Вкл"}</span>
                        <input class="toggle-checkbox" type="checkbox" onClick={toggleFreezeCamera}/>
                        <div className="toggle-switch"></div>
                      </label>
                    <Webcam ref={webcamRef} className="webcam" /> {/* Добавление класса для камеры */}
                    <div className="preview-progress-bars">
                      {forms.map(form => (
                        <div key={form.id}>
                          <label style={{color:'white'}}>{form.name} </label>
                          <progress id={form.name} value={0} max={100} />
                        </div>
                      ))}
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

export default ClassesForm;
