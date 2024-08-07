import React from 'react'
import "./HeaderOption.css"
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'


function HeaderOptions({ avatar, Icon, title , onClick}) {
  const user = useSelector(selectUser)
  return (
    <div onClick={onClick} className="headerOption">
        {Icon && <Icon className='headerOption_icon' />}
        {avatar && <Avatar className="headerOption__icon"src={user?.photoUrl}> {user?.email[0]}</Avatar>}
        <h3 className='headerOtion_title'>{title}</h3>
    </div>
  )
}

export default HeaderOptions