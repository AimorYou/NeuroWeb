import React, {useState} from 'react'
import { homeObjOne, homeObjTwo, homeObjThree, homeCLML } from '../components/InfoSection/Data';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import InfoSection from '../components/InfoSection'
import CLMLCardSection from '../components/CLMLCardSection'
import CLMLSliderSection from '../components/CLMLSliderSection';

const CLML = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
      setIsOpen(!isOpen);
      };
  return (
    <div>
      <Navbar toggle={toggle} />
      <InfoSection {...homeObjOne} />
      <CLMLCardSection />
      <CLMLSliderSection />
      <Footer />
    </div>
  )
}

export default CLML