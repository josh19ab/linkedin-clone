import React, { useEffect, useState } from 'react';
import './Feed.css';
import EditIcon from '@mui/icons-material/Edit';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post';

import { onSnapshot , collection, addDoc, serverTimestamp, query, orderBy} from 'firebase/firestore';
import db from './firebase';


function Feed() {
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);


useEffect(
  () => 
    onSnapshot(
      query(collection(db,"posts"), orderBy("timestamp","desc")),
       (snapshot) => 
      setPosts(snapshot.docs.map((doc) => 
        ({...doc.data(), id: doc.id})))
    ),[]);   

const sendPost = async (e) => {
  e.preventDefault();

  const collectionRef = collection(db,"posts");
  const payload = {
    name: 'Joshua Abraham',
    description: 'this is a test',
    message: input,
    photoUrl: '',
    timestamp: serverTimestamp()
  };
  addDoc(collectionRef, payload);

  setInput("");

};
     
  return (
    <div className='feed'>
      <div className="feed__inputContainer">
        <div className="feed_input">
          <EditIcon />
          <form>
            <input value={input} onChange={e => setInput(e.target.value)} type="text" />
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
      {posts.map((posts) => (
        <Post
          key={posts.id}
          name={posts.name}
          description={posts.description}
          message={posts.message}
          photoUrl={posts.photoUrl}
          timestamp={posts.timestamp}
        />
      ))}
    </div>
  );
}
export default Feed;
