// import React from 'react'
// import {
//     MenuIcon, Nav,
//     NavbarContainer
// } from './MenuBarElements'
// import { FaBars } from 'react-icons/fa'
// import DropdownMenu from './DropdownMenu'

// const MenuBar = () => {
//   return (
//     <Nav>
//         <NavbarContainer>
//             <MenuIcon>
//                 <DropdownMenu />
//             </MenuIcon>
//         </NavbarContainer>
//     </Nav>
//   )
// }

// export default MenuBar

// https://github.com/kontentino/react-multilevel-dropdown
import React from 'react'
import Dropdown from 'react-multilevel-dropdown';
import MenuIcon from '@mui/icons-material/Menu';
import { FaBars } from 'react-icons/fa'




const MenuBar = () => {
  return (
    <div className='dropdown-menu'>
      <div className='menu-wrapper'>
      <Dropdown
        title=<MenuIcon/>
        position='right'
        className="menu"
      >
        <a href='/register'><Dropdown.Item >
          Регистрация
        </Dropdown.Item>
        </a>
        <Dropdown.Item>
          Выбрать модель
          <Dropdown.Submenu position='right'>
            <a href='/get-started'>
            <Dropdown.Item>
              Компьютерное зрение
              <Dropdown.Submenu position='right' className='sub-menu'>
              <a href='/classification'>
              <Dropdown.Item>
                  Классификация изображений
                </Dropdown.Item>
                </a>
                <a href='/detection'>
                <Dropdown.Item>
                  Детекция
                </Dropdown.Item>
                </a>
                <a href='/emotions'>
                <Dropdown.Item>
                  Распознавание эмоций
                </Dropdown.Item>
                </a>
              </Dropdown.Submenu>
            </Dropdown.Item>
            </a>
          </Dropdown.Submenu>
        </Dropdown.Item>
      </Dropdown>
      </div>
    </div>
  )
}

export default MenuBar