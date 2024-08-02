import React from 'react'
import "./Sidebar.css"
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'

function Sidebar() {
    const user = useSelector(selectUser)
    
    const recentItems = (topic) =>(
        <div className="sidebar-recentItems">
            <span className='sidebar_hash'>#</span>
            <p>{topic}</p>
        </div>
    )


  return (
    <div className='sidebar'>
        <div className="sidebar__top">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-tKYRDgCnRdBW_pfdacIOpY0gv_0zf8bUQ&usqp=CAU" alt="" />
            <Avatar src={user.photoUrl} className='sidebar__avatar' style={{ width: '70px', height: '70px' }}> 
                {user.email[0]}
                </Avatar>
            <h2>{user.displayName} </h2>
            <h4>{user.email}</h4>
        </div>

    <div className="sidebar_stats">
        <div className="sidebar_stat">
            <p>who viewed </p>
            <p className='statbar_sideNumber'>2,456</p>
        </div>
        <div className="sidebar_stat">
            <p>views on post</p>
            <p className='statbar_sideNumber'>2,234</p>
        </div>
    </div>

    <div className="sidebar_bottom">
        <p>Recent</p>
        {recentItems('react,js')}
        {recentItems('programing')}
        {recentItems('developer')}
        {recentItems('softengineering')}
        {recentItems('design')}
        {recentItems('redox')} 

    </div>
    </div>
  )
}

export default Sidebar