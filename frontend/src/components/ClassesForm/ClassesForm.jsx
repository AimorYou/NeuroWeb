import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState } from 'react';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './ClassesForm.css';
import Webcam from 'react-webcam';
import axios from 'axios';


const ClassesForm = () => {
  const webcamRef = useRef(null);
  const [forms, setForms] = useState([]);
  const [formIdCounter, setFormIdCounter] = useState(1);
  const [showCamera, setShowCamera] = useState(false);
  const [checked, setChecked] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);

  const addForm = () => {
    const newForm = { id: formIdCounter, photos: [] };
    setFormIdCounter(formIdCounter + 1);
    setForms(prevForms => [...prevForms, newForm]);
  };

  const deleteForm = formId => {
    setForms(prevForms => prevForms.filter(form => form.id !== formId));
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
    // setForms(prevForms => {
    //   return prevForms.map(form => {
    //     if (form.id === formId) {
    //       // form.photos.push(photos);
    //       // console.log(form.photos)
    //       classPhotos[`class ${formId}`] = photos;
    //       const obj = { classes: classPhotos};
    //       const json = JSON.stringify(obj, null, 2);
    //       const blob = new Blob([json], { type: 'application/json' });
    //       const url = URL.createObjectURL(blob);
    //       const a = document.createElement('a');
    //       a.href = url;
    //       a.download = 'captured_photos.json';
    //       document.body.appendChild(a);
    //       a.click();
    //       document.body.removeChild(a);
    //       URL.revokeObjectURL(url);
    //     } else {
    //       console.log('Фотографии не были захвачены');
    //     }
    //     return form;
    //   })
    // })
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

  const sendJSON = async() => {
    const classPhotos = forms.reduce((accumulator, form) => {
      accumulator[`class_${form.id}`] = form.photos;
      return accumulator;
    }, {});
    
    const obj = { classes: classPhotos};
    const json = JSON.stringify(obj, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captured_photos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Send classPhotos to the server or further processing
    console.log(classPhotos);

    try {
      // Make a POST request to your backend server with the JSON data
      const response = await axios.post('api/test-json', classPhotos);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <React.Fragment>
      <div className='horizontal'>
      <div>
      {forms.map(form => (
        <div key={form.id}>
          {/* <Photo photos={form.photos} formId={form.id} deletePhoto={deletePhoto} /> */}
          <Camera formId={form.id} delForm={deleteForm} handleSavePhotos={handleSavePhotos} TakePhoto={() => TakePhoto(form.id)}/>
        </div>
      ))}
      <button className='add-form-btn' onClick={addForm}>Добавьте класс</button>
      </div>
      <div className='train-model-card'>
        <div className='heading'>Обучение</div>
        <button className='train-model-btn' onClick={sendJSON}>Обучить модель</button>
      </div>
          <div className='preview-model-card'>
              <div className='heading'>Превью</div>
                <div className='horizontal-line' />
                      <label className="toggle">
                        <span className="toggle-label">Input</span>
                        <input class="toggle-checkbox" type="checkbox" onClick={()=>setChecked(!checked)}/>
                        <div className="toggle-switch"></div>
                      </label>
                {showCamera && (
                  <div>
                    <Webcam ref={webcamRef} className="webcam" /> {/* Добавление класса для камеры */}
                  </div>
                )}
                {!showCamera && (
                <div className='class-text'>Вы должны обучить модель слева, прежде чем сможете просмотреть ее здесь</div>
                )}
          </div>
      </div>
    </React.Fragment>
  );
};

export default ClassesForm;
