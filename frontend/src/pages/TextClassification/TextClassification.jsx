import React from 'react';
import { TextClassificationForm } from '../../components/TextClassificationForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MenuBar from '../../components/MenuBar'

const FaceRecognition = () => {
  return (
    <div className='Classes-container'>
      <Navbar/>
    <React.Fragment>
        <TextClassificationForm/>
    </React.Fragment>
    <Footer/>
    </div>
  );
};

export default FaceRecognition;
