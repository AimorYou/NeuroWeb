import React from 'react';
import { ImageDetectionForm } from '../../components/ImageDetectionForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MenuBar from '../../components/MenuBar'

const ImageDetection = () => {
  return (
    <div className='Classes-container'>
      <Navbar/>
    <React.Fragment>
        <ImageDetectionForm/>
    </React.Fragment>
    <Footer/>
    </div>
  );
};

export default ImageDetection;
