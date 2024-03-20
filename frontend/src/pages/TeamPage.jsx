import React, {useState} from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MenuBar from '../components/MenuBar'
import TeamCards from '../components/Team'


const TeamPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
        };
  return (
    <div>
        <MenuBar />
        <Navbar toggle={toggle} />
        <TeamCards />
        <Footer />
    </div>
  )
}

export default TeamPage