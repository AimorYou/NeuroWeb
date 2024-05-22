import React, { useRef, useState } from 'react';
import './ExportModelModal.css';

const ExportModelModal = ({ show, onClose, modelDownloadUrl }) => {
    const codeRef = useRef(null);
    const [copyButtonText, setCopyButtonText] = useState('Копировать');

    if (!show) {
        return null;
    }

    const codeExample = `
import tensorflow as tf

# Load the model
model = tf.keras.models.load_model('path/to/your/model')

# Use the model for predictions
predictions = model.predict(your_data)
  `;

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
                    <svg className="close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffffff" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ExportModelModal;
