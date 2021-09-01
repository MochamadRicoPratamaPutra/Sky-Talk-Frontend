import React from 'react';
import Avatar from '../../../assets/avatar2.svg';
import Menu from '../../../assets/profileMenu.svg'
import Style from './chatNav.module.css'
const ChatNav = ({friendContact}) => {
  return (
    <div className={Style.container}>
      <div className={Style.contactBox}>
        <img src={friendContact.img ? friendContact.img : Avatar} alt="avatar" />
        <div className={Style.contact}>
          <p className="fs-18 fw-500 fc-black">{friendContact.name}</p>
          <p className="fs-15 fw-400 fc-blue">Online</p>
        </div>
      </div>
      <button><img src={Menu} alt="menu" /></button>
    </div>
  );
};

export default ChatNav;
