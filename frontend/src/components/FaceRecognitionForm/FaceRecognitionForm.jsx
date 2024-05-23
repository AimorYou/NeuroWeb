import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Slider from '@mui/material/Slider';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './FaceRecognitionForm.css';
import ExportModelModal from '../ExportModelModal';
import Webcam from 'react-webcam';
import axios from 'axios';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>×</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

const FaceRecognitionForm = () => {
  const webcamRef = useRef(null);
  const [forms, setForms] = useState([{ id: 1, name: 'Имя 1', photos: [] }, { id: 2, name: 'Имя 2', photos: [] }]);
  const [formIdCounter, setFormIdCounter] = useState(3);
  const [showCamera, setShowCamera] = useState(false);
  const [checked, setChecked] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [classMapping, setClassMapping] = useState({});
  const [freezeCamera, setFreezeCamera] = useState(false);
  const [socket, setSocket] = useState(null);
  const [videoStopped, setVideoStopped] = useState(false);
  const [recognizedPeople, setRecognizedPeople] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [numJitters, setNumJitters] = useState(1);
  const [modelSize, setModelSize] = useState('small');
  const [tolerance, setTolerance] = useState(0.6);
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modelDownloadUrl, setModelDownloadUrl] = useState('');

  const hyperParametersDescription = {
    numJitters: `Сколько раз перепробовать лицо при расчете кодирования. (От 1 до 10)`,
    modelSize: `Какую модель использовать: "large" или "small"`,
    tolerance: `Порог для сопоставления человека с определенным человеком. (От 0 до 1)`,
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

    setVideoStopped(prevState => !prevState);
  };

  const runFaceDetectorModel = async () => {

    // const model = await blazeface.load()
    console.log("FaceDetection Model is Loaded..")
    setInterval(() => {
      // detect(model);
      detect("")
    }, 100);

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

      var imageSrc = webcamRef.current.getScreenshot()
      var apiCall = {
        event: "localhost:subscribe",
        data: {
          'image': imageSrc,
          'class_mapping': classMapping
        },
      };
      socket.send(JSON.stringify(apiCall));
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


  const sendJSON = async () => {
    const classPhotos = forms.reduce((accumulator, form) => {
      accumulator[form.name] = form.photos;
      return accumulator;
    }, {});

    const hyperparameters = {
      num_jitters: numJitters,
      model_size: modelSize,
      tolerance: tolerance
    };

    const obj = { classes: classPhotos };
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
    const apiUrl = 'http://0.0.0.0:8888/api/cv/train/face-recognition/train-model?user_id=1'; // как посылать uid

    try {
      // Make a POST request to your backend server with the JSON data
      const response = await axios.post(apiUrl, blob, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Response:', response.data);
      if (response.data && response.data.status == 200) {
        const socket = new WebSocket('ws://0.0.0.0:8888/api/cv/train/ws/face-recognition/predict/1')
        setSocket(socket);
        setShowCamera(true)
      } else {
        console.log("Error", response.data.message);
        setPopupMessage(response.data.message);
      }

    } catch (error) {
      console.error('Error:', error);
    }


  };

  useEffect(() => {
    if (popupMessage) {
      setTimeout(() => {
        setPopupMessage("");
      }, 5000); // Close popup after 5 seconds
    }
  }, [popupMessage]);

  useEffect(() => {
    if (showCamera) {
      runFaceDetectorModel();
    }
  }, [showCamera, classMapping]);



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
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const disableButtons = forms.length < 1 || forms.some(form => form.photos.length === 0);

  const formatDescription = (description) => {
    return description.split('\n').map((paragraph, index) => (
      <React.Fragment key={index}>
        <p>{paragraph}</p>
        {index !== description.split('\n').length - 1 && <br />} {/* Добавляем <br />, если это не последний абзац */}
      </React.Fragment>
    ));
  };

  const renderDescriptionTooltip = (paramName) => {
    return (
      <div className="tooltip">
        <FontAwesomeIcon icon={faQuestionCircle} className="question-icon" />
        <span className="tooltiptext">{formatDescription(hyperParametersDescription[paramName])}</span>
      </div>
    );
  };

  const handleExportModel = () => {
    // Generate model download URL and show modal
    const downloadUrl = 'http://example.com/path_to_model';
    setModelDownloadUrl(downloadUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const codeExample = `
  import tensorflow as tf
  
  # Load the model
  model = tf.keras.models.load_model('path/to/your/model')
  
  # Use the model for predictions
  predictions = model.predict(your_data)
    `;

  return (
    <React.Fragment>
      <div className='text-to-show'>
        Функционал обучения собственных моделей на мобильных устройствах не доступен. Переключитесь, пожалуйста, на ПК.
      </div>
      <div className="hide">
        <div className='horizontal'>
          <div>
            {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage("")} />}
            {forms.map(form => (
              <div key={form.id}>
                {/* <Photo photos={form.photos} formId={form.id} deletePhoto={deletePhoto} /> */}
                <Camera formId={form.id} formName={form.name} renameForm={renameForm} delForm={deleteForm} handleSavePhotos={handleSavePhotos} TakePhoto={() => TakePhoto(form.id)} />
              </div>
            ))}
            <button className='add-form-btn' onClick={addForm}>Добавьте класс</button>
          </div>
          <div className='train-model-card'>
            <div className='heading'>Обучение</div>
            <button className='train-model-btn' onClick={sendJSON} disabled={disableButtons}>Обучить модель</button>
            <div className='horizontal-line' />
            <div className="advanced-options">
              <button className="advanced-options-btn" onClick={() => setShowOptions(!showOptions)}>Продвинутые возможности <FontAwesomeIcon icon={showOptions ? faChevronUp : faChevronDown} /></button>
              {showOptions && (
                <div className="advanced-options-content">
                  <div className='name-and-hint'>
                    <label htmlFor="numEpochs" className="param-label">Количество джиттеров</label>
                    {renderDescriptionTooltip('numJitters')}
                  </div>
                  <Slider
                          id="numJitters"
                          value={numJitters}
                          onChange={(event, newValue) => setNumJitters(newValue)}
                          aria-labelledby="numJitters"
                          step={1}
                          min={1}
                          max={10}
                          valueLabelDisplay="auto"
                          sx={{ color: 'white' }}
                        />

                  <div className='name-and-hint'>
                    <label htmlFor="numEpochs" className="param-label">Толерантность</label>
                    {renderDescriptionTooltip('tolerance')}
                  </div>
                  <Slider
                          id="tolerance"
                          value={tolerance}
                          onChange={(event, newValue) => setTolerance(newValue)}
                          aria-labelledby="tolerance"
                          step={0.1}
                          min={0}
                          max={1}
                          valueLabelDisplay="auto"
                          sx={{ color: 'white' }}
                        />
                  <div className='name-and-hint'>
                    <label htmlFor="modelSize" className="param-label">Размер модели</label>
                    {renderDescriptionTooltip('modelSize')}
                  </div>

                  <div className="select-container">
                    <select id="modelSize" onChange={(e) => setModelSize(e.target.value)}>
                      <option value="small">Small</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='preview-model-card'>
            <div className='preview'>Превью
              <button className='export-model-btn' onClick={handleExportModel}><IosShareIcon />Экспортировать модель</button>
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
      <ExportModelModal
        show={showModal}
        onClose={closeModal}
        modelDownloadUrl="/path/to/model.h5"
        codeExample={codeExample}
      />
    </React.Fragment>
  );
};

export default FaceRecognitionForm;
