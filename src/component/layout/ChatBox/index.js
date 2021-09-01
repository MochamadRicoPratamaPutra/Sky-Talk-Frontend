import React from 'react';
import ChatNav from '../ChatNav';
import Style from './chatBox.module.css';
import Avatar from '../../../assets/avatar1.svg';
// import ChatInput from '../ChatInput';
import Plus from '../../../assets/plus.svg';
import Emoji from '../../../assets/emoji.svg';
import File from '../../../assets/input.svg';
import { useSelector } from 'react-redux';
const ChatBox = ({ socket, friend, messages, handleMesage, handleSend }) => {
  const { profile } = useSelector((state) => state.user);
  const handleInput = (e) => {
    handleMesage(e.target.value);
  };
  return (
    <div>
      {friend ? (
        <>
          <ChatNav friendContact={friend} />
          <div className={` bc-bg ${Style.content}`}>
            {messages.map((item) => (
              <div className={`${Style.chatMessage} ${item.senderId === friend.id ? null : Style.rightChat}`}>
                <img
                  src={
                    item.senderId === friend.id
                      ? friend.img
                        ? friend.img
                        : Avatar
                      : profile.img
                      ? profile.img
                      : Avatar
                  }
                  alt="profile"
                  className={Style.profilePhoto}
                />
                <p className={`${item.senderId === friend.id ? Style.messageBox : Style.rightChatBox}`}>
                  {item.message}
                </p>
                <p className={Style.time}>{item.createdAt}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend}>
            <input
              type="text"
              className={`fs-16 fw-600 fw-grey ${Style.input}`}
              placeholder="Type your message..."
              onChange={(e) => handleInput(e)}
            />
            <div className={Style.button}>
              <button>
                <img src={Plus} alt="plus" />
              </button>
              <button>
                <img src={Emoji} alt="emoji" />
              </button>
              <button>
                <img src={File} alt="file" />
              </button>
            </div>
          </form>
          {/* <ChatInput /> */}
        </>
      ) : (
        <>
        <div className={`bc-bg ${Style.empty}`}>
          <p className={`fs-24 fw-400 fc-grey`}>Please select a chat to start messaging</p>
        </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
