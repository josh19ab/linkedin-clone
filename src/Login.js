import React, { useState } from 'react'
import './Login.css'
import { useDispatch } from 'react-redux';
import { auth} from './firebase';
import { createUserWithEmailAndPassword , updateProfile, signInWithEmailAndPassword} from 'firebase/auth'
import { login } from './features/userSlice';


function Login() {

  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [name, setName]=useState("");
  const [profilePic, setProfilePic]=useState("");
  
  const dispatch = useDispatch();
  
  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      dispatch( login({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        photoUrl: userCredential.user.photoURL,
      })
    )
    }).catch(function (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('No user found with this email address.');
      }
      else {
        alert(error);
      }
    });
};


  const register = () =>{
    if (!name) {
        return alert("Please enter full name!");
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
        photoURL: profilePic,
      })

      .then(() => {
        dispatch(login({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          displayName: name,
          photoUrl: profilePic
        }));
      });
    }).catch((error) => alert(error));
};



  return (
    <div className='login'>
        <img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg" alt="" />

        <form >
          <input 
            value={name} 
            placeholder="Full Name(required if registering)" 
            onChange={(e) => setName(e.target.value)} 
            type="text" 
          />

          <input 
            value={profilePic} 
            onChange={(e) => setProfilePic(e.target.value)} 
            placeholder="Profile Pic URL(Optional)" 
            type="text" 
          />

          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            type="text" 
          />

          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            type="password" 
          />

          <button type='submit' onClick={loginToApp}>Sign In</button>

        </form>

      <p>Not a member?{"  "}
        <span className="login__register" onClick={register} >Register Now</span>
      </p>

    </div>
  )
}

export default Login