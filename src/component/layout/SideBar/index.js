import React, { useState } from 'react';
import Menu from '../../../assets/menu.svg';
import Style from './sidebar.module.css';
import Search from '../../../assets/search.svg';
import Plus from '../../../assets/plus.svg';
import ChatCard from '../../base/chatCard';
import Setting from '../../../assets/setting.svg';
import Contact from '../../../assets/contact.svg';
import Phone from '../../../assets/phone.svg';
import Bookmark from '../../../assets/bookmark.svg';
import AddContact from '../../../assets/addContact.svg';
import FAQ from '../../../assets/faq.svg';
import Avatar from '../../../assets/avatar1.svg';
import Notification from '../../../assets/notification.svg';
import Lock from '../../../assets/lock2.svg';
import Data from '../../../assets/data.svg';
import Chat from '../../../assets/chat.svg';
import Device from '../../../assets/device.svg';
const SideBar = () => {
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(true);
  const handleMenu = () => {
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };
  const handleProfile = () => {
    if (profile) {
      setProfile(false);
    } else {
      setProfile(true);
      setMenu(false)
    }
  };
  return (
    <div className={Style.content}>
      <div className={profile ? Style.wrapper : Style.hide}>
        <div className={Style.title}>
          <p className="fs-29 fw-500 fc-blue">SkyTalk</p>
          <div className={Style.menuContainer}>
            <button className={Style.menu} onClick={handleMenu}>
              <img src={Menu} alt="menu" />
            </button>
            <div className={menu ? Style.menuDrop : Style.hide}>
              <button className={Style.menuChoice} onClick={handleProfile}>
                <img src={Setting} alt="setting" />
                <p className="fs-16 fc-white">Setting</p>
              </button>
              <button className={Style.menuChoice}>
                <img src={Contact} alt="Contact" />
                <p className="fs-16 fc-white">Contact</p>
              </button>
              <button className={Style.menuChoice}>
                <img src={Phone} alt="Calls" />
                <p className="fs-16 fc-white">Calls</p>
              </button>
              <button className={Style.menuChoice}>
                <img src={Bookmark} alt="saveMessages" />
                <p className="fs-16 fc-white">Save messages</p>
              </button>
              <button className={Style.menuChoice}>
                <img src={AddContact} alt="invite" />
                <p className="fs-16 fc-white">Invite Friends</p>
              </button>
              <button className={Style.menuChoice}>
                <img src={FAQ} alt="faq" />
                <p className="fs-16 fc-white">SkyTalk FAQ</p>
              </button>
            </div>
          </div>
        </div>
        <div className={Style.search}>
          <form>
            <input type="text" placeholder="Type your message" className={`bc-grey ${Style.searchBox}`} />
            <button>
              <img src={Search} alt="" />
            </button>
          </form>
          <button>
            <img src={Plus} alt="" />
          </button>
        </div>
        <div className={Style.nav}>
          <button className={`fs-20 fw-500 fc-white bc-blue ${Style.buttonNav}`}>All</button>
          <button className={`fs-20 fw-500 fc-black bc-none`}>Unread</button>
        </div>
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
      <div className={profile ? Style.hide : Style.wrapperProfile}>
        <div className={Style.titleProfile}>
          <button className={`fs-16 fw-500 fc-blue ${Style.backProfile}`} onClick={handleProfile}>{'<'}</button>
          <p className={`fs-24 fw-500 fc-blue`}>@wdlam</p>
        </div>
        <img src={Avatar} alt="avatar" className={Style.profilePic} />
        <div className={Style.name}>
          <p className="fs-22 fw-500 fc-black">Gloria Mckinney</p>
          <p className="fs-16 fw-400 fc-grey">@wdlam</p>
        </div>
        <div className={Style.account}>
          <p className="fs-19 fw-500 fc-black">Account</p>
          <p className="fs-16 fw-400 fc-black">+375(29)9638433</p>
          <button className="fs-16 fw-400 fc-blue">Tap to change phone number</button>
        </div>
        <hr className={Style.line} />
        <div className={Style.username}>
          <p className="fs-16 fw-500 fc-black">@wdlam</p>
          <p className="fs-16 fw-400 fc-grey">Username</p>
        </div>
        <hr className={Style.line} />
        <div>
          <p className="fs-16 fw-500 fc-black">I’m Senior Frontend Developer from Microsoft</p>
          <p className="fs-16 fw-400 fc-grey">Bio</p>
        </div>
        <div className={Style.setting}>
          <p className="fs-19 fw-500 fc-black">Setting</p>
          <button className={Style.settingMenu}>
            <img src={Notification} alt="Notification" />
            <p className="fs-17 fw-400 fc-black">Notification and Sound</p>
          </button>
          <button className={Style.settingMenu}>
            <img src={Lock} alt="Lock" />
            <p className="fs-17 fw-400 fc-black">Privacy and Security</p>
          </button>
          <button className={Style.settingMenu}>
            <img src={Data} alt="Data" />
            <p className="fs-17 fw-400 fc-black">Data and Storage</p>
          </button>
          <button className={Style.settingMenu}>
            <img src={Chat} alt="Chat" />
            <p className="fs-17 fw-400 fc-black">Chat Setting</p>
          </button>
          <button className={Style.settingMenu}>
            <img src={Device} alt="Device" />
            <p className="fs-17 fw-400 fc-black">Devices</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
