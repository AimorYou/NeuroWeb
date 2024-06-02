import React, {useState} from 'react'
import { homeObjOne, homeObjTwo, homeObjThree, homeNLP } from '../components/InfoSection/Data';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import InfoSection from '../components/InfoSection'
import NLPCardSection from '../components/NLPCardSection'
import NLPSliderSection from '../components/NLPSliderSection';

const NLP = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
      setIsOpen(!isOpen);
      };
  return (
    <div>
      <Navbar toggle={toggle} />
      <InfoSection {...homeObjTwo} />
      <NLPCardSection />
      <NLPSliderSection />
      <Footer />
    </div>
  )
}

export default NLP