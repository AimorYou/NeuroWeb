import React, { useRef, useState } from 'react';
import axios from 'axios';
import './ExportModelModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ExportModelModal = ({ show, onClose, modelDownloadUrl, codeExample, downloadEndpoint }) => {
  const codeRef = useRef(null);
  const [copyButtonText, setCopyButtonText] = useState('Копировать');
  const [downloadResponse, setDownloadResponse] = useState(null);
  const [isError, setIsError] = useState(false);

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

  const handleDownloadModel = async () => {
    try {
      const response = await axios.get(downloadEndpoint, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/octet-stream' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'model.pkl';
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);

      setDownloadResponse('Download successful');
      setIsError(false);
    } catch (error) {
      console.error('Error downloading the model:', error);
      setDownloadResponse('Error downloading the model');
      setIsError(true);
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
        <button className="download-btn" onClick={handleDownloadModel}>Скачать модель</button>
        {/* {downloadResponse && (
          <div className={`download-response ${isError ? 'error' : 'success'}`}>
            {downloadResponse}
          </div>
        )} */}
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className="close-icon" />
        </button>
      </div>
    </div>
  );
};

export default ExportModelModal;
