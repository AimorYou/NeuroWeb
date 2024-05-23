import React, { useRef, useState } from 'react';
import './ExportModelModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ExportModelModal = ({ show, onClose, modelDownloadUrl, codeExample }) => {
  const codeRef = useRef(null);
  const [copyButtonText, setCopyButtonText] = useState('Копировать');

  if (!show) {
    return null;
  }

  const copyCodeToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeExample);
      setCopyButtonText('Скопировано');
      setTimeout(() => {
        setCopyButtonText('Копировать');
      }, 1500);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Вы можете скачать модель и использовать следующий код для её интеграции:</h2>
        <div className="code-container">
          <pre ref={codeRef}>{codeExample}</pre>
          <button className="copy-btn" onClick={copyCodeToClipboard}>{copyButtonText}</button>
        </div>
        <a href={modelDownloadUrl} download="model.h5" className="download-btn">Скачать модель</a>
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className="close-icon" />
        </button>
      </div>
    </div>
  );
};

export default ExportModelModal;
