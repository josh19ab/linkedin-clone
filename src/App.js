import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Widgets from './Widgets';;

function App() {

  const user= useSelector(selectUser);
  const dispatch = useDispatch();

    useEffect(() =>{
      onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        // logged in
        const { email, uid, displayName, photoURL } = userCredential;
        dispatch(login({
          email,
          uid,
          displayName,
          photoUrl: photoURL,
        }));
      } else {
        // logged out
        dispatch(logout()); 
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>

      )}
    </div>
  
  );
}

export default App;
