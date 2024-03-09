import React, {useState} from 'react'
import { homeObjOne, homeObjTwo, homeObjThree, homeCV } from '../components/InfoSection/Data';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import InfoSection from '../components/InfoSection'
import CVCardSection from '../components/CVCardSection'
import CVSliderSection from '../components/CVSliderSection';

const CV = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
      setIsOpen(!isOpen);
      };
  return (
    <div>
      <Navbar toggle={toggle} />
      <InfoSection {...homeObjThree} />
      <CVCardSection />
      <CVSliderSection />
      <Footer />
    </div>
  )
}

export default CV