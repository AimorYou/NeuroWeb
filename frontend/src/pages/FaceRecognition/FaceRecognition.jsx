import React from 'react';
import { FaceRecognitionForm } from '../../components/FaceRecognitionForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MenuBar from '../../components/MenuBar'

const FaceRecognition = () => {
  return (
    <div className='Classes-container'>
      <Navbar/>
    <React.Fragment>
        <FaceRecognitionForm/>
    </React.Fragment>
    <Footer/>
    </div>
  );
};

export default FaceRecognition;
