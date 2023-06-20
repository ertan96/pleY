import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      const dropdownElement = document.querySelector(".dropdown-container");

      if (dropdownElement.contains(e.target) && !e.target.classList.contains('logout-button')) {
        return;
      }

      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
}, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className='dropdown-container'>
      <button onClick={openMenu} className='profile-button'>Profile</button>
      {showMenu && (
        <ul className="profile-dropdown">
            <li className='uncheck'>{user.firstName} {user.lastNameInitial}.</li>
            <li className='uncheck'>{user.email}</li>
            <li className="unclickable-item">About Me</li>
            <li className="unclickable-item">My Collections</li>
            <li className="unclickable-item">Find Friends</li>
            <li className="unclickable-item">Account Settings</li>
            <div className='line-container'>
              <li className="unclickable-item">Projects</li>
              <li className="unclickable-item">Messages</li>
            </div>
            <div className='line-container'>
              <li>
                <button onClick={logout} className='logout-button'>Log Out</button>
              </li>
            </div>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
