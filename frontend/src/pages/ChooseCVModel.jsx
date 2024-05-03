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
import ChooseCVModel from '../components/ChooseCVModel'

const GetStartedPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
        };
  return (
    <div>
        <Navbar toggle={toggle} />
        <ChooseCVModel />
        <Footer />
    </div>
  )
}

export default GetStartedPage