import React, { useState, useEffect } from 'react';
// import SideBar from '../../component/layout/SideBar';
import ChatBox from '../../component/layout/ChatBox';
import Style from './chat.module.css';
import StyleSideBar from '../../component/layout/SideBar/sidebar.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Search from '../../assets/search.svg';
import MenuLogo from '../../assets/menu.svg';
import Plus from '../../assets/plus.svg';
import ChatCard from '../../component/base/chatCard';
import Setting from '../../assets/setting.svg';
import Contact from '../../assets/contact.svg';
import Phone from '../../assets/phone.svg';
import Bookmark from '../../assets/bookmark.svg';
import AddContact from '../../assets/addContact.svg';
import FAQ from '../../assets/faq.svg';
import Avatar from '../../assets/avatar1.svg';
import Notification from '../../assets/notification.svg';
import Lock from '../../assets/lock2.svg';
import Data from '../../assets/data.svg';
import ChatLogo from '../../assets/chat.svg';
import Device from '../../assets/device.svg';
import { useDispatch } from 'react-redux';
import { logout, editProfile, deleteAcc } from '../../configs/redux/Action/userAction';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import { store } from 'react-notifications-component';
const Chat = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState(null);
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(true);
  const [errorImage, setErrorImage] = useState('')
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (socket && friend) {
      socket.off('msgFromBackend');
      socket.on('msgFromBackend', (data) => {
        console.log(data.senderId);
        console.log(friend.id);
        if (data.senderId === friend.id) {
          setMessages((currentValue) => [...currentValue, data]);
          store.addNotification({
            title: `You got a new message from ${friend.name}`,
            message: `${data.message}`,
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        } else {
          store.addNotification({
            title: `You got a new message from ${friend.name}`,
            message: `${data.message}`,
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        }
      });
    }
  }, [socket, friend]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const dataUsers = res.data.data;
        setFriends(dataUsers);
      });
  }, []);
  useEffect(() => {
    if (friend) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/message/${friend.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          const resultMsg = res.data.data;
          // console.log(resultMsg);
          setMessages(resultMsg);
        });
    }
  }, [friend]);
  // console.log(friend);
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket && message) {
      // console.log(friend);
      socket.emit(
        'sendMessage',
        {
          idReceiver: friend.id,
          messageBody: message,
        },
        (data) => {
          setMessages((currentValue) => [...currentValue, data]);
        }
      );
      setMessage('');
    }
  };
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
      setMenu(false);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    swal('Logout Success', 'You will be missed', 'success');
    socket.disconnect();
    setMenu(false);
    history.push('/login');
  };
  const handleFriend = (data) => {
    setFriend(data);
  };
  const handleMessageInput = (data) => {
    setMessage(data);
  };
  const handleChange = (e) => {
    dispatch({ type: 'CHANGE_VALUE', payload: { [e.target.name]: e.target.value } });
  };
  const [imgPrev, setImgPrev] = useState(null);
  const handleInputFile = (e) => {
    e.preventDefault();
    if (e.target.files[0].size > 1048576 * 3) {
      setErrorImage('File too big')
    } else if (e.target.files[0].type !== "image/png" && e.target.files[0].type !== "image/jpg" && e.target.files[0].type !== "image/jpeg") {
      setErrorImage('File can only be image type')
    }else if (e.target.files.length !== 0) {
      setErrorImage('')
      setImgPrev(URL.createObjectURL(e.target.files[0]));
      dispatch({ type: 'CHANGE_VALUE', payload: { [e.target.name]: e.target.files[0] } });
    }
    console.log(e.target.files[0]);
  };
  const handleEditProfile = () => {
    dispatch(editProfile(user, imgPrev))
      .then(() => {
        swal('Success', 'Success Updating Profile', 'success');
      })
      .catch((err) => {
        swal('Error', `${err.message}`, 'error');
      });
  };
  const handleDeleteAcc = (data) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover your account!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteAcc(data))
        swal('Your account has been deleted, we will miss you', {
          icon: 'success',
        });
        localStorage.removeItem('token');
        socket.disconnect();
        setMenu(false);
        history.push('/login');
      } else {
        swal('Error');
      }
    });
  };
  return (
    <div className={Style.container}>
      <div className={StyleSideBar.content}>
        <div className={profile ? StyleSideBar.wrapper : StyleSideBar.hide}>
          <div className={StyleSideBar.title}>
            <p className="fs-29 fw-500 fc-blue">SkyTalk</p>
            <div className={StyleSideBar.menuContainer}>
              <button className={StyleSideBar.menu} onClick={handleMenu}>
                <img src={MenuLogo} alt="menu" />
              </button>
              <div className={menu ? StyleSideBar.menuDrop : StyleSideBar.hide}>
                <button className={StyleSideBar.menuChoice} onClick={handleProfile}>
                  <img src={Setting} alt="setting" />
                  <p className="fs-16 fc-white">Setting</p>
                </button>
                <button className={StyleSideBar.menuChoice}>
                  <img src={Contact} alt="Contact" />
                  <p className="fs-16 fc-white">Contact</p>
                </button>
                <button className={StyleSideBar.menuChoice}>
                  <img src={Phone} alt="Calls" />
                  <p className="fs-16 fc-white">Calls</p>
                </button>
                <button className={StyleSideBar.menuChoice}>
                  <img src={Bookmark} alt="saveMessages" />
                  <p className="fs-16 fc-white">Save messages</p>
                </button>
                <button className={StyleSideBar.menuChoice}>
                  <img src={AddContact} alt="invite" />
                  <p className="fs-16 fc-white">Invite Friends</p>
                </button>
                <button className={StyleSideBar.menuChoice}>
                  <img src={FAQ} alt="faq" />
                  <p className="fs-16 fc-white">SkyTalk FAQ</p>
                </button>
                <button className={`fs-16 fc-white ${StyleSideBar.menuChoice}`} onClick={handleLogout}>
                  <p>Logout</p>
                </button>
              </div>
            </div>
          </div>
          <div className={StyleSideBar.search}>
            <form>
              <input type="text" placeholder="Type your message" className={`bc-grey ${StyleSideBar.searchBox}`} />
              <button>
                <img src={Search} alt="" />
              </button>
            </form>
            <button>
              <img src={Plus} alt="" />
            </button>
          </div>
          <div className={StyleSideBar.nav}>
            <button className={`fs-20 fw-500 fc-white bc-blue ${StyleSideBar.buttonNav}`}>All</button>
            <button className={`fs-20 fw-500 fc-black bc-none`}>Unread</button>
          </div>
          <div className={StyleSideBar.contactList}>
            {friends.map((item) => (
              <>
                <ChatCard data={item} handleFriend={handleFriend} />
              </>
            ))}
          </div>
        </div>
        <div className={profile ? StyleSideBar.hide : StyleSideBar.wrapperProfile}>
          <div className={StyleSideBar.titleProfile}>
            <button className={`fs-16 fw-500 fc-blue ${StyleSideBar.backProfile}`} onClick={handleProfile}>
              {'<'}
            </button>
            <p className={`fs-24 fw-500 fc-blue`}>{user.username ? user.username : 'Please input your username'}</p>
          </div>
          <img
            src={imgPrev !== null ? imgPrev : user.img ? user.img : Avatar}
            alt="avatar"
            className={StyleSideBar.profilePic}
          />
          <form onSubmit={handleInputFile} className={`${StyleSideBar.uploadImage} fs-16 fw-400 fc-white`}>
            <input type="file" name="img" id="img" className={StyleSideBar.hide} onChange={handleInputFile} />
            <label htmlFor="img">Change profile picture</label>
          </form>
          <p className={errorImage === '' ? StyleSideBar.hide : StyleSideBar.errorMessage}>{errorImage}</p>
          <div className={StyleSideBar.name}>
            <input className="fs-22 fw-500 fc-black" name="name" value={user.name} onChange={handleChange} />
            <p className="fs-16 fw-400 fc-grey">{user.username ? user.username : 'Please input your username'}</p>
          </div>
          <div className={StyleSideBar.account}>
            <p className="fs-19 fw-500 fc-black">Account</p>
            <input
              className="fs-16 fw-400 fc-black"
              name="phone"
              value={user.phone}
              placeholder="Please input your phone number"
              onChange={handleChange}
            />
          </div>
          <hr className={StyleSideBar.line} />
          <div className={StyleSideBar.account}>
            <input
              className="fs-16 fw-500 fc-black"
              name="username"
              value={user.username}
              placeholder="Please input your username"
              onChange={handleChange}
            />
            <p className="fs-16 fw-400 fc-grey">Username</p>
          </div>
          <hr className={StyleSideBar.line} />
          <div className={StyleSideBar.account}>
            <input
              className="fs-16 fw-500 fc-black"
              name="bio"
              value={user.bio}
              placeholder="Please input your bio"
              onChange={handleChange}
            />
            <p className="fs-16 fw-400 fc-grey">Bio</p>
          </div>
          <button className={`${StyleSideBar.uploadImage} fs-22 fw-400 fc-white`} onClick={handleEditProfile}>
            Save Setting
          </button>
          <div className={StyleSideBar.setting}>
            <p className="fs-19 fw-500 fc-black">Setting</p>
            <button className={StyleSideBar.settingMenu}>
              <img src={Notification} alt="Notification" />
              <p className="fs-17 fw-400 fc-black">Notification and Sound</p>
            </button>
            <button className={StyleSideBar.settingMenu}>
              <img src={Lock} alt="Lock" />
              <p className="fs-17 fw-400 fc-black">Privacy and Security</p>
            </button>
            <button className={StyleSideBar.settingMenu}>
              <img src={Data} alt="Data" />
              <p className="fs-17 fw-400 fc-black">Data and Storage</p>
            </button>
            <button className={StyleSideBar.settingMenu}>
              <img src={ChatLogo} alt="Chat" />
              <p className="fs-17 fw-400 fc-black">Chat Setting</p>
            </button>
            <button className={StyleSideBar.settingMenu}>
              <img src={Device} alt="Device" />
              <p className="fs-17 fw-400 fc-black">Devices</p>
            </button>
            <button className={`${StyleSideBar.settingMenu} ${StyleSideBar.delete}`} onClick={() => handleDeleteAcc(user)}>
              <p className="fs-17 fw-400 fc-white">Delete Account</p>
            </button>
          </div>
        </div>
      </div>
      <div className={Style.chat}>
        <ChatBox
          socket={socket}
          friend={friend}
          messages={messages}
          handleMesage={handleMessageInput}
          handleSend={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;

// return (
//   <div className={Style.container}>
//     <SideBar socket={socket}/>
//     <div className={Style.chat}>
//       <ChatBox socket={socket}/>
//     </div>
//   </div>
// );
