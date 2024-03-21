import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import AboutSection from '../components/AboutSection'
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../components/AboutSection/Data';
import Advantages from '../components/Advantages';
import Steps from '../components/Steps';
import TypesOfData from '../components/TypesOfData';
import Footer from '../components/Footer';
import GetStartedSliderSection from '../components/GetStartedSliderSection';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    };
    
  return (
    <div className='App'>
      <MenuBar />
      <Navbar toggle={toggle} />
      <AboutSection {...homeObjOne}/>
      <AboutSection {...homeObjTwo}/>
      <AboutSection {...homeObjThree}/>
      <Footer />
    </div>
  )
};

export default MainPage;