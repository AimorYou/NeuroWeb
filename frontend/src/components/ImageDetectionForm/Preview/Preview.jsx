import Webcam from 'react-webcam';
import './Preview.css';
import React, { useRef, useState } from 'react';

const PreviewForm = () => {
    const webcamRef = useRef(null);
    return (
        <React.Fragment>
            <div>
                <Webcam ref={webcamRef} className="webcam" /> {/* Добавление класса для камеры */}
            </div>
        </React.Fragment>
    )
}

export default PreviewForm;