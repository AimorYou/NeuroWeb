import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState } from 'react';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './ClassesForm.css';
import Webcam from 'react-webcam';
import { Preview } from './Preview';


const ClassesForm = () => {
  const webcamRef = useRef(null);
  const [forms, setForms] = useState([]);
  const [formIdCounter, setFormIdCounter] = useState(1);
  const [showCamera, setShowCamera] = useState(false);
  const [checked, setChecked] = useState(false);

  const addForm = () => {
    const newForm = { id: formIdCounter, photos: [] };
    setFormIdCounter(formIdCounter + 1);
    setForms(prevForms => [...prevForms, newForm]);
  };

  const deleteForm = formId => {
    setForms(prevForms => prevForms.filter(form => form.id !== formId));
  };

  const TakePhoto = formId => {
    const webcamRef = useRef(null);
    const photo = webcamRef.current.getScreenshot();

    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          form.photos.push(photo);
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

  return (
    <React.Fragment>
      <div className='horizontal'>
      <div>
      {forms.map(form => (
        <div key={form.id}>
          <Photo photos={form.photos} formId={form.id} deletePhoto={deletePhoto} />
          <Camera formId={form.id} delForm={deleteForm} TakePhoto={() => TakePhoto(form.id)} />
        </div>
      ))}
      <button className='add-form-btn' onClick={addForm}>Добавьте класс</button>
      </div>
      <div className='train-model-card'>
        <div className='heading'>Обучение</div>
        <button className='train-model-btn' onClick={() => setShowCamera(!showCamera)}>Обучить модель</button>
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
