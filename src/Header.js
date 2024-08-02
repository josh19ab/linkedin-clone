import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import HeaderOptions from "./HeaderOptions";
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch  } from 'react-redux';
import { logout } from './features/userSlice';
import { auth } from './firebase';


function Header() {
  
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    dispatch(logout())
    auth.signOut();
  }

  return (
    <div className='header'>

        <div className="header_left">
          <img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" alt="error" />

          <div className="header_search">
            <SearchIcon />
            <input type="text" />
          </div>
        </div>

        <div className="header_right">
          <HeaderOptions Icon={HomeIcon} title="Home" />
          <HeaderOptions Icon={SupervisorAccountIcon} title="My Network" />
          <HeaderOptions Icon={BusinessCenterIcon} title="Jobs" />
          <HeaderOptions Icon={ChatIcon} title="Messsaging" />
          <HeaderOptions Icon={NotificationsIcon} title="Notification" />
          <HeaderOptions avatar={true} title="me" onClick={logoutOfApp} />

        </div>


    </div>
  )
}

export default Header