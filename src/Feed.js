import React, { useState } from 'react'
import './Feed.css'
import EditIcon from '@mui/icons-material/Edit';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post';

function Feed() {

    const [posts,setPosts]= useState([]);

    const sendPost = e =>{
        e.preventDefault();
    }; 

  return (
    <div className='feed'>
        <div className="feed__inputContainer">
            <div className="feed_input">
                <EditIcon />
                <form>
                    <input type="text" />
                    <button onClick={sendPost} type='submit'>Send</button>
                </form>
            </div>
            <div className="feed__inputOptions">
                <InputOption Icon={ImageIcon} title='Photo' color="#70B5F9" />
                <InputOption Icon={SubscriptionsIcon} title='Video' color="#E7A33E" />
                <InputOption Icon={EventNoteIcon} title='Event' color="#C0CBCD" />
                <InputOption Icon={CalendarViewDayIcon} title='Write article' color="#7FC15E" />
            </div>
        </div>

    {/* Posts */}
    {posts.map((post) => (
        <Post />
    ))}
    <Post 
        name='Joshua Abraham'
        description="this is test"
        message="WOW it works" 
    />
    </div>
  )
}

export default Feed