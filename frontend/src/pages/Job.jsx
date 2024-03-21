import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import JobSection from '../components/JobSection'
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../components/JobSection/Data';
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
      <JobSection {...homeObjOne}/>
      <JobSection {...homeObjTwo}/>
      <JobSection {...homeObjThree}/>
      <Footer />
    </div>
  )
};

export default MainPage;