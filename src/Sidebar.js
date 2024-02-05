import React from 'react'
import "./Sidebar.css"
import { Avatar } from '@mui/material'

function Sidebar() {

    const recentItems = (topic) =>(
        <div className="sidebar-recentItems">
            <span className='sidebar_hash'>#</span>
            <p>{topic}</p>
        </div>
    )


  return (
    <div className='sidebar'>
        <div className="sidebar__top">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-6ndnOQ1Kj-_ckQCow0gUIG8Te8LE3N7MAtWgB2RAVw&s" alt="" />
            <Avatar className='sidebar__avatar'/>
            <h2>Joshua </h2>
            <h4>jo19@gamil.com</h4>
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