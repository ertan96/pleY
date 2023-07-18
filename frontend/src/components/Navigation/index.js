import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar';
import './Navigation.css';
import { BsYelp, BsGithub, BsLinkedin } from "react-icons/bs";
import { FaAngellist } from "react-icons/fa";
import CategorySearch from '../CategorySearch/CategorySearch';

function Navigation() {
  const location = useLocation();
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='profile-button-container'>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      sessionLinks = (
        <div className='login-signup'>
          <NavLink to="/login" 
            className={`nav-login-button ${location.pathname !== '/' ? 'nav-login-button-style' : ''}`}>
              Log In</NavLink>
          <NavLink to="/signup" className='nav-signup-button'>Sign Up</NavLink>
        </div>
      );
    }
  }

  return (
    <ul>
      <li>
        <div className='nav-container'
          style={location.pathname !== '/' ? {borderBottom: '1px solid rgba(0, 0, 0, 0.1)'} : {}}
        >
          <div className='home-button'>
            <NavLink exact to="/" className='font-logo-link'>
              {location.pathname === '/' ? (
                <h1 className='homepage'>pleY <BsYelp size={30}/></h1>
              ): (
                <h1 className='not-homepage'>pleY <BsYelp size={30} className='homepage-logo'/> </h1>
              )}
              </NavLink>
          </div>
          <div className='searchbar-style'>
            <SearchBar searchTerm={word => console.log(word)}/>
          </div>
          <CategorySearch/>
          <div className='about-links'>
            <div className='github-link'>
              <a href="https://github.com/ertan96/pleY"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsGithub className='icon' size={40} />
              </a>
            </div>
            <div className='linkedin-link'>
              <a href="https://www.linkedin.com/in/ernest-tan3/"
                target="_blank"
                rel="noopener noreferrer"
              >
              <BsLinkedin className='icon' size={40} />
              </a>
            </div>
            <div className='wellfound-link'>
              <a href="https://wellfound.com/u/ernest-tan-6"
                target="_blank"
                rel="noopener noreferrer"
              >
              <FaAngellist className='icon' size={40} />
              </a>
            </div>
          </div>
          {sessionLinks}
        </div>
      </li>
    </ul>
  );
}

export default Navigation;