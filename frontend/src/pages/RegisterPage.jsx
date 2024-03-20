import React, {useState} from 'react'
import Register from '../components/RegistrationSection'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'


const SigninPage = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className='App'>
      <MenuBar />
      <Navbar toggle={toggle} />
      <Register />
      <Footer />
      {/* C Футером прикол */}
    </div>
  )
}

export default SigninPage