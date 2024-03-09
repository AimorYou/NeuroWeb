import React, {useState} from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import FAQ from '../components/FAQSection'


const FAQPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
        };
  return (
    <div>
        <Navbar toggle={toggle} />
        <FAQ />
        <Footer />
    </div>
  )
}

export default FAQPage