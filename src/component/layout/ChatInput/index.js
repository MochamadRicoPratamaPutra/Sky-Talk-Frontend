import React from 'react'
import Style from './chatInput.module.css'
import Plus from '../../../assets/plus.svg'
import Emoji from '../../../assets/emoji.svg'
import File from '../../../assets/input.svg'
const ChatInput = () => {
  return (
    <div className={Style.container}>
      <form>
        <input type="text" className={`fs-16 fw-600 fw-grey ${Style.input}`} placeholder='Type your message...'/>
        <div className={Style.button}>
          <button><img src={Plus} alt="plus" /></button>
          <button><img src={Emoji} alt="emoji" /></button>
          <button><img src={File} alt="file" /></button>
        </div>
      </form>
    </div>
  )
}

export default ChatInput
