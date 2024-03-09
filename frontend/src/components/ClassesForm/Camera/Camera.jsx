import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UploadAltIcon from '@mui/icons-material/Upload';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './Camera.css';
import Dropdown from 'react-multilevel-dropdown';

const CameraForm = ({formId, delForm}) => {
  const webcamRef = useRef(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [captureInterval, setCaptureInterval] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const capturePhoto = () => {
    const capturedPhoto = webcamRef.current.getScreenshot();
    setCapturedPhotos(prevPhotos => [...prevPhotos, { photo: capturedPhoto }]);
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
//TODO HandleSavePhotos можно добавить отправку на сервер
  const handleSavePhotos = () => {
    if (capturedPhotos.length > 0) {
      console.log('Сохранение фотографий:', capturedPhotos);
    } else {
      console.log('Фотографии не были захвачены');
    }
  };

  const MenuBar = () => {
    return (
      <div className='more-btn'>
        <div>
        <Dropdown
          title=<MoreVertIcon/>
          className="more-btn">
              <Dropdown.Item  onClick={() => delForm(formId)} >
                Удалить класс
              </Dropdown.Item>
        </Dropdown>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="horizontal">
      <div className="card">
        <div className="class-text">
          Класс {formId}
        </div>
        <MenuBar/>
        <div class="horizontal-line"></div>
        <div class="horizontal-btns">
          <button className='camera-upload-photo' onClick={() => setShowCamera(!showCamera) }><CameraAltIcon/></button>
          <button className='camera-upload-photo' onClick={handleSavePhotos}><UploadAltIcon/></button>
        </div>
        {showCamera && (
          <div>
            <Webcam ref={webcamRef} className="webcam" /> {/* Добавление класса для камеры */}
            <button className={'btn'} onMouseDown={startCapture} onMouseUp={stopCapture}>
              Сфотографировать
            </button>
          </div>
        )}
        <div className="photo-container">
          {capturedPhotos.map((photo, index) => (
            <div key={photo.id} className="photo-item">
              <img src={photo.photo} alt={`Photo ${index}`} />
              {/* <button className='btn' onClick={() => deletePhoto(index)}>Delete</button> */}
            </div>
          ))}
        </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default CameraForm;
