import React, {useState} from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import PrivatePolicy from '../components/PrivatePolicySection'


const FAQPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
        };
  return (
    <div>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <MenuBar />
        <Navbar toggle={toggle} />
        <PrivatePolicy />
        <Footer />
    </div>
  )
}

export default FAQPage