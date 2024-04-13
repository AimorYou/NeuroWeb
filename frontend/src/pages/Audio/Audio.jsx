import React from 'react';
import { AudioForm } from '../../components/AudioForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MenuBar from '../../components/MenuBar'


const Audio = () => {
  return (
    <div className='Audio-container'>
      <Navbar/>
    <React.Fragment>
        <AudioForm/>
    </React.Fragment>
    <Footer/>
    </div>
  );
};

export default Audio;
