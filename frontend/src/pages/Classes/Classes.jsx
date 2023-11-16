import React from 'react';
import { ClassesForm } from '../../components/ClassesForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Classes = () => {
  return (
    <div className='Classes-container'>
      <Navbar/>
    <React.Fragment>
        <ClassesForm/>
    </React.Fragment>
    <Footer/>
    </div>
  );
};

export default Classes;
