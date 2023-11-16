import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState } from 'react';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './ClassesForm.css';


const ClassesForm = () => {
  const [forms, setForms] = useState([]);
  const [formIdCounter, setFormIdCounter] = useState(1);

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
      {forms.map(form => (
        <div key={form.id}>
          <Photo photos={form.photos} formId={form.id} deletePhoto={deletePhoto} />
          <Camera formId={form.id} delForm={deleteForm} TakePhoto={() => TakePhoto(form.id)} />
        </div>
      ))}
      <button className='add-form-btn' onClick={addForm}>Добавьте класс</button>
    </React.Fragment>
  );
};

export default ClassesForm;
