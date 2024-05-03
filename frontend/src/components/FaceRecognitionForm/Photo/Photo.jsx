import React from 'react';

const Photo = ({ photos, formId, deletePhoto }) => {
  return (
    <React.Fragment>
      {photos.map((photo, photoIndex) => (
        <div key={photo.id}>
          <img src={photo} alt={`Photo ${photoIndex + 1}`} />
          <button onClick={() => deletePhoto(formId, photoIndex)}>Удалить</button>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Photo;
