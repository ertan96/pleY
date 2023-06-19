import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
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
            <NavLink exact to="/">Home</NavLink>
          </div>
          {sessionLinks}
        </div>
      </li>
    </ul>
  );
}

export default Navigation;