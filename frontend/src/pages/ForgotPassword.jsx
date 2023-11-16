import React, {useState} from 'react'
import SignIn from '../components/Signin'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import ForgotPassword from '../components/ForgotPasswordSection'


const ForgotPasswordPage = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className='App'>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <ForgotPassword />
      <Footer />
      {/* C Футером прикол */}
    </div>
  )
}

export default ForgotPasswordPage