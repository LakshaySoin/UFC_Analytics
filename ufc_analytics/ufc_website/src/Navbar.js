import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [click, setClick] = useState(false);
  const [link, setLink] = useState(true);

  const handleClick = () => {
    setClick(!click)
    setLink(!link)
  };

  const closeMobileMenu = () => {
    setClick(false);
    if (window.innerWidth <= 960) {
      setLink(!link);
    } else {
      setLink(true);
    }
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setLink(false);
    } else {
      setLink(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          {link && <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/UFC_Analytics' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/UFC_Analytics/predictions'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Predictions
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/UFC_Analytics/video-analytics'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Video Analytics
              </Link>
            </li>
          </ul>}
        </div>
      </nav>
    </>
  );
}

export default Navbar