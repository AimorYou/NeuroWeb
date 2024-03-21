// https://github.com/kontentino/react-multilevel-dropdown
import React from 'react'
import Dropdown from 'react-multilevel-dropdown';
import MenuIcon from '@mui/icons-material/Menu';
import { FaBars } from 'react-icons/fa'




const DropdownMenu = () => {
  return (
    <div className='dropdown-menu'>
      <Dropdown
        title=<FaBars/>
        position='right'
      >
        <Dropdown.Item >
          Регистрация
        </Dropdown.Item>
        <Dropdown.Item>
          Выбрать модель
          <Dropdown.Submenu position='right'>
            <Dropdown.Item>
              Классификация
              <Dropdown.Submenu position='right' className='sub-menu'>
              <Dropdown.Item>
                  Классификация изображений
                </Dropdown.Item>
                <Dropdown.Item>
                  Распознавание лиц
                </Dropdown.Item>
                <Dropdown.Item>
                  Позы
                </Dropdown.Item>
              </Dropdown.Submenu>
            </Dropdown.Item>
            <Dropdown.Item>
              NLP
              <Dropdown.Submenu position='right'>
              <Dropdown.Item>
                  Распознавание речи
                </Dropdown.Item>
              </Dropdown.Submenu>
            </Dropdown.Item>
            <Dropdown.Item>
              Classical ML
              <Dropdown.Submenu position='right' className='sub-menu-classical-ml'>
              <Dropdown.Item>
                  Предсказание столбца в таблице
                </Dropdown.Item>
                <Dropdown.Item>
                  Продвинутая аналитика
                </Dropdown.Item>
              </Dropdown.Submenu>
            </Dropdown.Item>
            <Dropdown.Item>
              3D
            </Dropdown.Item>
          </Dropdown.Submenu>
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default DropdownMenu