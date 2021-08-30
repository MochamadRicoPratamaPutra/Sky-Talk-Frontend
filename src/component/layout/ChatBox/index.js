import React, { useState, useEffect } from 'react';
import ChatNav from '../ChatNav';
import Style from './chatBox.module.css';
// import ChatInput from '../ChatInput';
import Plus from '../../../assets/plus.svg';
import Emoji from '../../../assets/emoji.svg';
import File from '../../../assets/input.svg';
const ChatBox = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (socket) {
      socket.on('sendMsgFromBackend', (dataMsg) => {
        setMessages((data) => {
          return [...data, dataMsg];
        });
      });
      socket.emit('initialGroup', { group: 'coding', email: 'rico00730@gmail.com' });
    }
  }, [socket]);
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (socket) {
      socket.emit('sendMessage', { email: 'rico00730@gmail.com', message: message, group: 'coding' }, (data) => {
        setMessages([...messages, data]);
      });
      // socket.emit('exampleCallback', 'risano@gmail.com', (data)=>{
      //   alert(data)
      // })
      setMessage('');
    }
  };
  return (
    <div>
      <ChatNav />
      <div className={` bc-bg ${Style.content}`}>
        <ul class="list-group">
          {/* <h1>nilai count {count}</h1> */}
          <li class="list-group-item active" aria-current="true">
            group message {'coding'}
          </li>
          {messages.map((item) => (
            <li class="list-group-item">
              [{item.email}]::{item.message} [{item.time}]
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          className={`fs-16 fw-600 fw-grey ${Style.input}`}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
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
    </div>
  );
};

export default ChatBox;
