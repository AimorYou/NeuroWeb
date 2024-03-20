import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import InfoSection from '../components/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../components/InfoSection/Data';
import Advantages from '../components/Advantages';
import Steps from '../components/Steps';
import TypesOfData from '../components/TypesOfData';
import Footer from '../components/Footer';
import GetStartedSliderSection from '../components/GetStartedSliderSection';
import Detection from "../components/Detection/Detection";

const DetectionPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    };
    
  return (
    <div className='App'>
      <MenuBar />
      <Navbar toggle={toggle} />
      <Detection />
      <Footer />
    </div>
  )
};

export default DetectionPage;