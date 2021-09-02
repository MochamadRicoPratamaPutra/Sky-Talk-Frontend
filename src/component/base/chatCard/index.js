import React from 'react';
import Avatar from '../../../assets/avatar2.svg';
import Style from './chatCard.module.css';
const ChatCard = ({ data, handleFriend }) => {
  const handleClick = () => {
    handleFriend(data)
  }
  return (
    <div>
      <div className={Style.container} onClick={handleClick}>
        <div className={Style.chat}>
          <img src={data.img ? data.img : Avatar} alt="avatar" className={Style.img} />
          <div className={Style.chatContent}>
            <p className="fs-18 fw-500 fc-black">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
