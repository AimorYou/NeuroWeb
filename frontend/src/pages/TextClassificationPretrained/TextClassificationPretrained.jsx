import React from 'react';
import { TextClassification } from '../../components/TextClassification';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MenuBar from '../../components/MenuBar'

const TextClassificationPretrained = () => {
  return (
    <div className='Classes-container'>
      <Navbar/>
    <React.Fragment>
        <TextClassification/>
    </React.Fragment>
    <Footer/>
    </div>
  );
};

export default TextClassificationPretrained;
