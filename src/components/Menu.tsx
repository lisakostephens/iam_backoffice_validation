import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

import DashboardIcon from '../../public/assets/icons/dashboard.svg';
import Clients from '../../public/assets/icons/clients.svg';
import Cadastro from '../../public/assets/icons/user-add.svg';
import Services from '../../public/assets/icons/services.svg';
import SettingsIcon from '../../public/assets/icons/setting.svg';
import Person from '../../public/assets/icons/person.svg';

export const Menu = () => {
  const[currentPage, toggleCurrentPage] = useState('/');
  const[showMenu, toggleMenu] = useState(false);
  const[windowWidth, updateWindowWidth] = useState<number>(0);

  const menuItems: { icon: JSX.Element, label: string, link: string }[] = [
    {
      icon: <DashboardIcon/>,
      label: 'Dashboard',
      link: '/dashboard'
    },
    {
      icon: <Person/>,
      label: 'Perfil',
      link: '/perfil'
    },
    {
      icon: <Clients/>,
      label: 'Clients',
      link: '/clients'
    },
    {
      icon: <Cadastro/>,
      label: 'Cadastro',
      link: '/cadastro'
    },
    {
      icon: <Services/>,
      label: 'Services',
      link: '/services'
    },
    {
      icon: <SettingsIcon/>,
      label: 'Resources',
      link: '/resources'
    },
  ];

  const router = useRouter();

  useEffect(() => {
    checkCurrentPage();
    validateMenuVisibility();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateMenuVisibility = () => {
    updateWindowWidth(window.innerWidth);
    toggleMenu(window.innerWidth > 1000);
    window.addEventListener('resize', () => {
      updateWindowWidth(window.innerWidth);
      toggleMenu(window.innerWidth > 1000);
    });
  }

  const checkCurrentPage = () => {
    toggleCurrentPage(window.location.pathname);
    router.events.on('routeChangeComplete', () => {
      toggleCurrentPage(window.location.pathname);
    });
  }

  return (
    <div>
      {windowWidth <= 1000 &&
      <div className={`menu-icon ${showMenu ? 'opened' : ''}`} onClick={() => toggleMenu(!showMenu)}>
        <span></span>
        <span></span>
        <span></span>
      </div>}
      <div className={`menu ${showMenu ? 'show' : 'hide'}`}>
        <h1 className='logo'>IAM Backoffice</h1>
        <ul>
          {
            menuItems.map(({ icon, label, link }, index: number) => 
            <Link key={index} href={link}>
              <li className={currentPage === link ? 'selected' : ''} onClick={() => toggleMenu(false)}>
                <icon.type />
                <label>{label}</label>
              </li>
            </Link>)
          }
        </ul>
      </div>
      {showMenu && windowWidth <= 1000 && <div className='menu-bg' onClick={() => toggleMenu(!showMenu)}></div>}
    </div>
  )
}

