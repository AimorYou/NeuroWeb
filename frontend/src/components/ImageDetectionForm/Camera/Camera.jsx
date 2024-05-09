import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UploadAltIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import './Camera.css';

const CameraForm = ({ formId, formName, delForm, renameForm, handleSavePhotos, handleSaveTxtFiles, setClassNames }) => {
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

  const deleteAllPhotos = () => {
    setUploadedPhotos([]);
  };
  const deleteUploadedTxtFile = (index) => {
    const updatedTxtFiles = [...uploadedTxtFiles];
    updatedTxtFiles.splice(index, 1);
    setUploadedTxtFiles(updatedTxtFiles);
  };

  const deleteAllTxtFiles = () => {
    setUploadedTxtFiles([]);
  };


  return (
    <React.Fragment>
      <div className="horizontal">
        <div className="card">
          <div className="horizontal-className" onClick={() => setShowRenameForm(true)}>
            <div className="class-text">
              Загрузите изображения и .txt файлы
            </div>
          </div>
          <div className="horizontal-line"></div>
          <div className="class-names-form">
            <input
              type="text"
              value={classNames}
              onChange={e => setClassNamesLocal(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Введите имена через запятую"
            />
          </div>
          <div className="horizontal-btns">
            <label className={'btn'} htmlFor="uploadInput">Загрузить фото <UploadAltIcon fontSize='small' /></label>
            <input
              ref={inputRef}
              id="uploadInput"
              type="file"
              accept="image/jpeg"
              onChange={handleImageFileInput}
              style={{ display: 'none' }}
              multiple
            />
          </div>
          <div
            className={`drop-area ${isDragging ? 'drag-over' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => inputRef.current && inputRef.current.click()}
          > Перетащите сюда файлы или нажмите, чтобы выбрать фотографии
          </div>
          <div className="photo-container">
            <div className="uploaded-files">
              <h3>Загруженные изображения:</h3>
              <div className="file-list-container">
                <ul className="file-list">
                  {uploadedPhotos.map((file, index) => (
                    <li key={index}>
                      {file.name}
                      <IconButton onClick={() => deleteUploadedPhoto(index)} size="small" sx={{ color: 'white' }}>
                        <DeleteIcon sx={{ fontSize: 22 }} />
                      </IconButton>
                    </li>
                  ))}
                </ul>
              </div>
              {uploadedPhotos.length > 0 && (
                   <button className='btn' onClick={deleteAllPhotos}>Удалить все фото</button>
                )}
            </div>
          </div>
          <div className="horizontal-btns">
            <label className={'btn'} htmlFor="uploadTxtInput">Загрузить .txt <UploadAltIcon fontSize='small' /></label>
            <input
              ref={txtInputRef}
              id="uploadTxtInput"
              type="file"
              accept=".txt"
              onChange={handleTxtFileInput}
              style={{ display: 'none' }}
              multiple
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
            Перетащите сюда файлы или нажмите, чтобы выбрать файлы .txt
          </div>
          <div className="uploaded-files">
            <h3>Загруженные файлы .txt:</h3>
            <div className="file-list-container">
              <ul className="file-list">
                {uploadedTxtFiles.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <IconButton onClick={() => deleteUploadedTxtFile(index)} size="small" sx={{ color: 'white' }}>
                      <DeleteIcon sx={{ fontSize: 22 }} />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </div>
            {uploadedTxtFiles.length > 0 && (
                <button className='btn' onClick={deleteAllTxtFiles}>Удалить все файлы</button>
              )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CameraForm;
