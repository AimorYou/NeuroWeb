import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './TextClassificationForm.css';
import Webcam from 'react-webcam';
import axios from 'axios';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>×</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

const TextClassificationForm = () => {
  const webcamRef = useRef(null);
  const [forms, setForms] = useState([{ id: 1, name: 'Класс 1', photos: [] }, { id: 2, name: 'Класс 2', photos: [] }]);
  const [formIdCounter, setFormIdCounter] = useState(3);
  const [showCamera, setShowCamera] = useState(false);
  const [checked, setChecked] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [classMapping, setClassMapping] = useState({});

  const addForm = () => {
    const newForm = { id: formIdCounter, name: `Имя ${formIdCounter}`, photos: [] };
    setFormIdCounter(formIdCounter + 1);
    setForms(prevForms => [...prevForms, newForm]);
  };

  const deleteForm = formId => {
    setForms(prevForms => prevForms.filter(form => form.id !== formId));
  };

  const renameForm = (formId, newName) => {
    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          return { ...form, name: newName };
        }
        return form;
      });
    });
  };


  const TakePhoto = formId => {
    const capturedPhoto = webcamRef.current.getScreenshot();

    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          form.photos.push(capturedPhoto);
        }
        return form;
      });
    });
  };

  const deletePhoto = (formId, photoIndex) => {
    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          form.photos.splice(photoIndex, 1);
        }
        return form;
      });
    });
  };


  const classPhotos = {};
  const handleSavePhotos = (formId, photos) => {
    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          form.photos = photos.map(photo => photo.photo);
        }
        return form;
      });
    });

    // Log forms with photos for testing
    console.log(forms);
  };


  const sendJSON = async () => {
    const classPhotos = forms.reduce((accumulator, form) => {
      accumulator[form.name] = form.photos;
      return accumulator;
    }, {});

    const obj = { classes: classPhotos };
    const json = JSON.stringify(obj, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'captured_photos.json';
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);

    // Send classPhotos to the server or further processing
    console.log(classPhotos);
    const apiUrl = 'http://0.0.0.0:8888/api/cv/train/face-recognition/train-model?user_id=1'; // как посылать uid

    try {
      // Make a POST request to your backend server with the JSON data
      const response = await axios.post(apiUrl, blob, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Response:', response.data);
      if (response.data && response.data.status == 200) {
        // console.log('Updating classMapping:', response.data.class_mapping); // Log before updating
        // setClassMapping(response.data.class_mapping)
        setShowCamera(true)
      } else {
        console.log("Error", response.data.message);
        // window
      }
      
    } catch (error) {
      console.error('Error:', error);
    }


  };

  const disableButtons = forms.length < 1 || forms.some(form => form.photos.length === 0);

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
                {/* <Photo photos={form.photos} formId={form.id} deletePhoto={deletePhoto} /> */}
                <Camera formId={form.id} formName={form.name} renameForm={renameForm} delForm={deleteForm} handleSavePhotos={handleSavePhotos} TakePhoto={() => TakePhoto(form.id)} />
              </div>
            ))}
            <button className='add-form-btn' onClick={addForm}>Добавьте класс</button>
          </div>
          <div className='train-model-card'>
            <div className='heading'>Обучение</div>
            <button className='train-model-btn' onClick={sendJSON} disabled={disableButtons}>Обучить модель</button>
          </div>
          <div className='preview-model-card'>
            <div className='preview'>Превью
              <button className='export-model-btn' disabled={classPhotos.length > 0 ? true : false}><IosShareIcon />Экспортировать модель</button>
            </div>
            <div className='horizontal-line' />
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
