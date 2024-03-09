import React, {useState} from 'react'
import SignIn from '../components/Signin'
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
      <Navbar toggle={toggle} />
      <SignIn />
      <Footer />
      {/* C Футером прикол */}
    </div>
  )
}

export default SigninPage