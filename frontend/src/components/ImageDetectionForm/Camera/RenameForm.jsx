import React, { useState, useRef } from 'react';
import './RenameForm.css';

const RenameForm = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    const namesArray = value.split(',').map(name => name.trim());
    onSubmit(namesArray);
    setValue('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleBlur = () => {
    handleSubmit();
  };

  return (
    <div className={`rename-form`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown} 
        onBlur={handleBlur}
        placeholder="Введите имена через запятую"
      />
      <button onClick={handleSubmit}>Сохранить</button>
    </div>
  );
};

export default RenameForm;
