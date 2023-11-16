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
        <a href='/signin'><Dropdown.Item >
          Личный кабинет
        </Dropdown.Item>
        </a>
        <a href='/getstarted'>
        <Dropdown.Item>
          Выбрать модель
          <Dropdown.Submenu position='right'>
            <a href='/CV'>
            <Dropdown.Item>
              CV
              <Dropdown.Submenu position='right' className='sub-menu'>
              <a href='/classes'>
              <Dropdown.Item>
                  Классификация изображений
                </Dropdown.Item>
                </a>
                <a href='/classes'>
                <Dropdown.Item>
                  Распознавание лиц
                </Dropdown.Item>
                </a>
                <a href='/classes'>
                <Dropdown.Item>
                  Позы
                </Dropdown.Item>
                </a>
              </Dropdown.Submenu>
            </Dropdown.Item>
            </a>
            <a href='/NLP'>
            <Dropdown.Item>
              NLP
              <Dropdown.Submenu position='right'>
              <a href='/classes'>
              <Dropdown.Item>
                  Распознавание речи
                </Dropdown.Item>
                </a>
              </Dropdown.Submenu>
            </Dropdown.Item>
            </a>
            <a href='CLML'>
            <Dropdown.Item>
              Classical ML
              <Dropdown.Submenu position='right' className='sub-menu-classical-ml'>
              <a href='/classes'>
              <Dropdown.Item>
                  Предсказание столбца в таблице
                </Dropdown.Item>
                </a>
                <a href='/classes'>
                <Dropdown.Item>
                  Продвинутая аналитика
                </Dropdown.Item>
                </a>
              </Dropdown.Submenu>
            </Dropdown.Item>
            </a>
          </Dropdown.Submenu>
        </Dropdown.Item>
        </a>
      </Dropdown>
      </div>
    </div>
  )
}

export default MenuBar