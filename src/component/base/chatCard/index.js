import React from 'react';
import Avatar from '../../../assets/avatar2.svg';
import Check from '../../../assets/doubleCheck.svg';
import Style from './chatCard.module.css';
const ChatCard = () => {
  return (
    <div className={Style.container}>
      <div className={Style.chat}>
        <img src={Avatar} alt="avatar" className={Style.img} />
        <div className={Style.chatContent}>
          <p className="fs-18 fw-500 fc-black">Theresa Webb</p>
          <p className="fs-14 fw-400 fc-blue">Why did you do that?</p>
        </div>
      </div>
      <div>
        <p className="fs-14 fw-400 fc-grey">15:20</p>
        <img src={Check} alt="check" />
      </div>
    </div>
  );
};

export default ChatCard;
