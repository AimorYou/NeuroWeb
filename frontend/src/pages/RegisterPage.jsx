import React, {useState} from 'react'
import Register from '../components/RegistrationSection'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'

import {UserProvider} from '../context/UserContext';


const SigninPage = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className='App'>
      <UserProvider>
      <Navbar toggle={toggle} />
      <Register />
      <Footer />
      </UserProvider>
    </div>
  )
}

export default SigninPage