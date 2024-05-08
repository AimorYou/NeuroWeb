import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UploadAltIcon from '@mui/icons-material/Upload';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import './Camera.css';

const CameraForm = ({ formId, formName, delForm, renameForm, handleSavePhotos, handleSaveTxtFiles, setClassNames  }) => {
  const webcamRef = useRef(null);
  const inputRef = useRef(null);
  const txtInputRef = useRef(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [captureInterval, setCaptureInterval] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showRenameForm, setShowRenameForm] = useState(false);
  const [newName, setNewName] = useState(formName);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isDraggingTxt, setIsDraggingTxt] = useState(false);
  const [uploadedTxtFiles, setUploadedTxtFiles] = useState([]);
  const [classNames, setClassNamesLocal] = useState('');

  const handleTxtFileInput = (event) => {
    const files = event.target.files;
    const uploaded = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setUploadedTxtFiles((prevTxtFiles) => [...prevTxtFiles, { name: file.name, content }]);
        handleSaveTxtFiles(formId, { name: file.name, content });
        
      };
      reader.readAsText(file);
    });
  };

  const handleTxtDragEnter = (event) => {
    event.preventDefault();
    setIsDraggingTxt(true);
  };

  const handleTxtDragLeave = (event) => {
    event.preventDefault();
    setIsDraggingTxt(false);
  };

  const handleTxtDragOver = (event) => {
    event.preventDefault();
  };

  const handleTxtDrop = (event) => {
    event.preventDefault();
    setIsDraggingTxt(false);
    const files = event.dataTransfer.files;
    const uploaded = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setUploadedTxtFiles((prevTxtFiles) => [...prevTxtFiles, { name: file.name, content }]);
      };
      reader.readAsText(file);
    });
  };



  const handleImageFileInput = (event) => {
    const files = event.target.files;
    const uploaded = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        setUploadedPhotos((prevImageFiles) => [...prevImageFiles, { name: file.name, src }]);
        handleSavePhotos(formId, { name: file.name, src });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    const uploaded = Array.from(files).map((file) => {
      return { photo: URL.createObjectURL(file) };
    });
    setUploadedPhotos((prevPhotos) => [...prevPhotos, ...uploaded]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setClassNames(classNames);
    }
  };

  const handleBlur = () => {
    setClassNames(classNames);
  };

  const capturePhoto = () => {
    const capturedPhoto = webcamRef.current.getScreenshot();
    setCapturedPhotos((prevPhotos) => [...prevPhotos, { photo: capturedPhoto }]);
  };

  const startCapture = () => {
    capturePhoto();
    const interval = setInterval(capturePhoto, 200);
    setCaptureInterval(interval);
  };

  const stopCapture = () => {
    if (captureInterval) {
      clearInterval(captureInterval);
      setCaptureInterval(null);
    }
  };

  const deletePhoto = (index) => {
    const updatedPhotos = [...capturedPhotos];
    updatedPhotos.splice(index, 1);
    setCapturedPhotos(updatedPhotos);
  };

  const deleteUploadedPhoto = (index) => {
    const updatedPhotos = [...uploadedPhotos];
    updatedPhotos.splice(index, 1);
    setUploadedPhotos(updatedPhotos);
  };



  return (
    <React.Fragment>
      <div className="horizontal">
        <div className="card">
          <div className="horizontal-className">
            <div className="class-text">
              Загрузите файл .csv
            </div>
          </div>
          <div className="horizontal-line"></div>
          <div className="horizontal-btns">
            <label className={'btn'} htmlFor="uploadInput">Загрузить .csv <UploadAltIcon fontSize='small'/></label>
            <input
              ref={txtInputRef}
              id="uploadInput"
              type="file"
              accept=".csv"
              onChange={handleTxtFileInput}
              style={{ display: 'none' }}
            />
          </div>
          <div
            className={`drop-area ${isDraggingTxt ? 'drag-over' : ''}`}
            onDragEnter={handleTxtDragEnter}
            onDragLeave={handleTxtDragLeave}
            onDragOver={handleTxtDragOver}
            onDrop={handleTxtDrop}
            onClick={() => txtInputRef.current && txtInputRef.current.click()}
          >
            Перетащите сюда файл или нажмите, чтобы выбрать файл .csv
          </div>
          <div className="uploaded-files">
            <h3>Загруженный файл .csv:</h3>
              {uploadedTxtFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CameraForm;
