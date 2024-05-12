import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './TextClassificationForm.css';
import Webcam from 'react-webcam';
import axios from 'axios';

const TextClassificationForm = () => {
  const [forms, setForms] = useState([{ id: 1, name: 'Имя 1', photos: [] }]);
  const [showCamera, setShowCamera] = useState(true);
  const [inputText, setInputText] = useState('я не люблю пиписины');
  const [classificationResult, setClassificationResult] = useState('');
  const [uploadedTxtFiles, setUploadedTxtFiles] = useState([]);
  const [socket, setSocket] = useState(null);

  const handleSaveTxtFiles = (formId, txtFiles) => {
    setUploadedTxtFiles((prevTxtFiles) => [
      ...prevTxtFiles,
      { formId, txtFiles },
    ]);
  };

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };


  const runFaceDetectorModel = async () => {
    console.log("FaceDetection Model is Loaded..") 
    setInterval(() => {
      detect("")
    }, 1000);
  };

  const detect = async() => {

    

    if (socket && socket.readyState === WebSocket.OPEN) {
      var apiCall = {
        event: "localhost:subscribe",
        data: {
          text: "inputText"
        },
      };
      socket.send(JSON.stringify(apiCall));
    } else {
      console.error("WebSocket is not open yet.");
    }
    
  };
  

  const sendJSON = async () => {
    const formData = new FormData();
    uploadedTxtFiles.forEach((uploadedTxtFile) => {
      const blob = new Blob([uploadedTxtFile.txtFiles.content], { type: 'text/csv' });
      const file = new File([blob], `${uploadedTxtFile.txtFiles.name}`, { type: 'text/csv' });
      formData.append(`file`, file);
    });

    const apiUrl = `http://0.0.0.0:8888/api/nlp/train/classification/train-model?user_id=1`; // как посылать uid
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log('Response:', response.data);
      setShowCamera(true);
      const socket = new WebSocket('ws://0.0.0.0:8888/api/nlp/train/ws/classification/1');
      setSocket(socket);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClassify = () => {
    detect();
  };

  useEffect(() => {
    runFaceDetectorModel();
  }, []);

  // useEffect(() => {
  //   return () => {
  //     if (socket) {
  //       socket.close();
  //     }
  //   };
  // }, [socket]);

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
                <Camera formId={form.id} formName={form.name} handleSaveTxtFiles={handleSaveTxtFiles}/>
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
              <div className='text-classification-form'>
                <textarea
                  className='text-input'
                  placeholder='Введите текст для классификации'
                  value={inputText}
                  onChange={handleTextChange}
                />
                <button className='classify-btn' onClick={handleClassify}>Классифицировать</button>
                {(
                  <div className='result'>Результат классификации - </div>
                )}
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

export default TextClassificationForm;
