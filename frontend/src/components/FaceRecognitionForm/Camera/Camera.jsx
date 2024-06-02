import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UploadAltIcon from '@mui/icons-material/Upload';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './Camera.css';
import Dropdown from 'react-multilevel-dropdown';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import RenameForm from './RenameForm'; // Путь к RenameForm

const CameraForm = ({ formId, formName, delForm, renameForm, handleSavePhotos }) => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [captureInterval, setCaptureInterval] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showRenameForm, setShowRenameForm] = useState(false);
  const [newName, setNewName] = useState(formName);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);

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

  const deleteAllPhotos = () => {
    setCapturedPhotos([]);
  };

  const renameClass = (newName) => {
    // Обновляем имя класса
    renameForm(formId, newName);
    setShowRenameForm(false);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedPhotos((prevPhotos) => [...prevPhotos, { photo: e.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const MenuBar = () => {
    return (
      <div className='more-btn'>
        <div>
          <Dropdown
            title=<MoreVertIcon />
            className="more-btn">
            <Dropdown.Item onClick={() => setShowRenameForm(true)}>Переименовать класс</Dropdown.Item>
            <Dropdown.Item onClick={() => delForm(formId)}>Удалить класс</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    )
  };

  return (
    <React.Fragment>
      <div className="horizontal">
        <div className="card">
          <div className="horizontal-className" onClick={() => setShowRenameForm(true)}>
            <div className="class-text">
              {showRenameForm ? (
                <RenameForm
                  initialValue={formName}
                  onSubmit={renameClass}
                />
              ) : (
                `${formName}`
              )}
            </div>
            <div className='class-edit-btn'><ModeEditIcon fontSize='small' /></div>
          </div>
          <MenuBar />
          <div className="horizontal-line"></div>
          <div className="horizontal-btns">
            <button className='camera-upload-photo' onClick={() => setShowCamera(!showCamera)}><CameraAltIcon /></button>
            <button className='camera-upload-photo' onClick={() => fileInputRef.current.click()}><UploadAltIcon /></button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          {showCamera && (
            <div>
              <Webcam ref={webcamRef} className="webcam" />
              <button className='btn' onMouseDown={startCapture} onMouseUp={stopCapture} onClick={() => handleSavePhotos(formId, capturedPhotos)}>
                Сфотографировать
              </button>
              <div className="horizontal-btns">
                <button className='btn' onClick={deleteAllPhotos}>Удалить все фото</button>
              </div>
            </div>
          )}
          <div className="photo-container">
            {capturedPhotos.map((photo, index) => (
              <div key={index} className="photo-item" onMouseEnter={() => setHoveredPhoto(index)} onMouseLeave={() => setHoveredPhoto(null)}>
                <img src={photo.photo} alt={`Photo ${index}`} style={{ position: 'relative' }} />
                {hoveredPhoto === index && (
                  <IconButton
                    onClick={() => deletePhoto(index)}
                    size="small"
                    sx={{ position: 'relative', top: -56, right: 0, color: 'white' }}
                  >
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CameraForm;
