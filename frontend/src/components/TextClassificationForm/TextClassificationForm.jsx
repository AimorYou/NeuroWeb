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
  const [isTraining, setIsTraining] = useState(false);


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
    setIsTraining(true);
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
    setIsTraining(false);
  };

  const handleClassify = async () => {
    const apiCall = {
      text: inputText,
    };
  
    try {
      const response = await axios.post('http://0.0.0.0:8888/api/nlp/train/classification/predict?user_id=1', apiCall, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setClassificationResult(response.data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleExportModel = () => {
    const downloadUrl = 'http://example.com/path_to_model';
    setModelDownloadUrl(downloadUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const codeExample = `
  import pickle

  # Загружаем модель
  with open("path_to_model", "rb") as f:
      model = pickle.load(f.read())

  text = "some text"

  # Вызываем метод для предсказания результата
  result = model.predict(text)
  print(result)
    `;

  const shouldShowTrainButton = true

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
          {shouldShowTrainButton && (
        isTraining ? (
          <div className="loading-indicator">Идет обучение...</div>
        ) : (
          <div>
          <button className='train-model-btn' onClick={sendJSON} >Обучить модель</button>
          </div>
        )
      )}
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
                <button className='classify-btn' onClick={handleClassify}>Классифицировать</button>
                {classificationResult && (
                  <div className='result'>Результат классификации: {classificationResult}</div>
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
