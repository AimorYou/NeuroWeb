import React, { useRef, useState, useCallback, useEffect } from 'react';
import './TextClassification.css';
import axios from 'axios';

const TextClassificationForm = () => {
  const [showCamera, setShowCamera] = useState(true);
  const [inputText, setInputText] = useState('');
  const [classificationResult, setClassificationResult] = useState('');



  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleClassify = async () => {
    try {
      const response = await axios.post('http://0.0.0.0:8888/api/nlp/predict', { text: inputText });
      setClassificationResult(response.data.result);
      console.log(response.data.result)
    } catch (error) {
      console.error('Error:', error);
    }
  };


 


  return (
    <React.Fragment>
      <div className='text-to-show'>
        Функционал обучения собственных моделей на мобильных устройствах не доступен. Переключитесь, пожалуйста, на ПК.
      </div>
      <div className="hide">
        <div className='horizontal'>
          <div className='preview-model-card'>
            <div className='preview'>Классификация текстов</div>
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
                  <div className='result'>{classificationResult}</div>
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
