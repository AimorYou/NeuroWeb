import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './TextClassificationForm.css';
import ExportModelModal from '../ExportModelModal';
import Webcam from 'react-webcam';
import axios from 'axios';

const TextClassificationForm = () => {
  const [forms, setForms] = useState([{ id: 1, name: 'Имя 1', photos: [] }]);
  const [showCamera, setShowCamera] = useState(false);
  const [inputText, setInputText] = useState('');
  const [classificationResult, setClassificationResult] = useState('');
  const [uploadedTxtFiles, setUploadedTxtFiles] = useState([]);
  const [socket, setSocket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modelDownloadUrl, setModelDownloadUrl] = useState('');

  const [messageHistory, setMessageHistory] = useState([]);

  const [socketUrl, setSocketUrl] = useState('ws://0.0.0.0:8888/api/nlp/train/ws/classification/1');

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(() => sendMessage(inputText), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.event === 'classification_result') {
          setClassificationResult(message.data);
        }
      };
    }
  }, [socket]);

  const handleSaveTxtFiles = (formId, txtFiles) => {
    setUploadedTxtFiles((prevTxtFiles) => [
      ...prevTxtFiles,
      { formId, txtFiles },
    ]);
  };

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const sendJSON = async () => {
    const formData = new FormData();
    uploadedTxtFiles.forEach((uploadedTxtFile) => {
      const blob = new Blob([uploadedTxtFile.txtFiles.content], { type: 'text/csv' });
      const file = new File([blob], `${uploadedTxtFile.txtFiles.name}`, { type: 'text/csv' });
      formData.append(`file`, file);
    });

    const apiUrl = `http://0.0.0.0:8888/api/nlp/train/classification/train-model?user_id=1`;
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log('Response:', response.data);
      setShowCamera(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClassify = () => {
    
      const apiCall = {
        event: "classify_text",
        data: {
          text: inputText,
        },
      };
      socket.send(JSON.stringify(apiCall));
   
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const handleExportModel = () => {
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
              <button className='export-model-btn' onClick={handleExportModel}><IosShareIcon />Экспортировать модель</button>
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
                <button className='classify-btn' onClick={handleClickSendMessage}>Классифицировать</button>
                {classificationResult && (
                  <div className='result'>Результат классификации: {lastMessage}</div>
                )}
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

export default TextClassificationForm;
