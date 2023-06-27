import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar';
import './Navigation.css';
import { BsYelp } from "react-icons/bs";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='profile-button-container'>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='login-signup'>
        <NavLink to="/login" className='nav-login-button'>Log In</NavLink>
        <NavLink to="/signup" className='nav-signup-button'>Sign Up</NavLink>
      </div>
    );
  }

  return (
    <ul>
      <li>
        <div className='nav-container'>
          <div className='home-button'>
            <NavLink exact to="/" className='font-logo-link'>
              pleY <BsYelp size={30} className='homepage-logo'/> 
              </NavLink>
          </div>
          <div>
            <SearchBar searchTerm={word => console.log(word)}/>
          </div>
          {sessionLinks}
        </div>
      </li>
    </ul>
  );
}

export default Navigation;