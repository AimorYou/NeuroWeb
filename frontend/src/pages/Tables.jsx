import React, {useState} from 'react'
import SignIn from '../components/Signin'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import InfoSection from '../components/InfoSection'
import CustomCardsSection from '../components/CustomCardsSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/Data';
import GetStartedSliderSection from '../components/GetStartedSliderSection';
import ChooseModel from '../components/ChooseModel'

const Tables = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
        };
  return (
    <div>
        <Navbar toggle={toggle} />
        <iframe
          src="http://0.0.0.0:8501"
          height="800"
          style={{ width: "100%", border: "none" }}
        ></iframe>
        <Footer />
    </div>
  )
}

export default Tables