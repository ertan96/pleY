import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { MdLogout } from 'react-icons/md';
import { AiOutlineMessage, AiOutlineUserAdd } from 'react-icons/ai';
import { RiFolder2Line } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { BsBookmark, BsPersonCircle} from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';

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
      <div onClick={openMenu} className='profile-button'><BsPersonCircle size={36} /></div>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className='uncheck'>{user.firstName} {user.lastNameInitial}.</li>
          <li className="unclickable-item">
            <div className="icon-wrapper">
              <VscAccount size={24} className='icon' />
              <span>About Me</span>
            </div>
          </li>
          <li className="unclickable-item">
            <div className="icon-wrapper">
              <BsBookmark size={24} className='icon' />
              <span>My Collections</span>
            </div>
          </li>
          <li className="unclickable-item">
            <div className="icon-wrapper">
              <AiOutlineUserAdd size={24} className='icon' />
              <span>Find Friends</span>
            </div>
          </li>
          <li className="unclickable-item-account">
            <div className="icon-wrapper">
              <FiSettings size={24} className='icon' />
              <span>Account Settings</span>
            </div>
          </li>
          <div className='line-container'>
            <li className="unclickable-item">
              <div className="icon-wrapper">
                <RiFolder2Line size={24} className='icon' />
                <span>Projects</span>
              </div>
            </li>
            <li className="unclickable-item">
              <div className="icon-wrapper">
                <AiOutlineMessage size={24} className='icon' />
                <span>Messages</span>
              </div>
            </li>
          </div>
          <div className='line-container'>
            <li>
              <button onClick={logout} className='logout-button'>
                <MdLogout size={24}/> 
                <span>Log Out</span>
              </button>
            </li>
          </div>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
