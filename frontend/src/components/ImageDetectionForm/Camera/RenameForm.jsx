import React, { useState, useEffect, useRef } from 'react';
import './RenameForm.css';

const RenameForm = ({ initialValue, onSubmit }) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    if (value === '') {
        onSubmit(initialValue)
    } else {
        onSubmit(value);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleSubmit(); 
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <div className={`rename-form`} onClick={handleClick}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown} 
          placeholder="Новое имя"
          autoFocus
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
};

export default RenameForm;
