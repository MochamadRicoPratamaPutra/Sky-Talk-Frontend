import React from 'react';
import SideBar from '../../component/layout/SideBar';
import ChatBox from '../../component/layout/ChatBox';
import Style from './chat.module.css';
const Chat = ({ socket }) => {
  return (
    <div className={Style.container}>
      <SideBar />
      <div className={Style.chat}>
        <ChatBox socket={socket}/>
      </div>
    </div>
  );
};

export default Chat;
