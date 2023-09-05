import React, { useState } from 'react'
import "./Login.css"
import {Link, useHistory} from "react-router-dom"
import { auth } from './firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxOpen, faShoppingCart, faShoppingBasket, faDove } from '@fortawesome/free-solid-svg-icons';




function Login() {

  const history = useHistory();

  const [email,setEmail] =useState('');
  const [password,setPassword] =useState('');
  const signin =e =>{
    e.preventDefault();

    //firebase code

    auth.signInWithEmailAndPassword(email,password)
    .then(auth =>{
      history.push('/');
    })

    .catch(error => alert(error.message));

  }

  const signUp = e =>{
    e.preventDefault();

    

    // more firebase code

    auth.createUserWithEmailAndPassword(email,password)
    .then((auth)=>{
      console.log(auth);
      //if user is created successfully then push to home page
      if(auth){
        history.push("/");
      }
    })
    .catch(error => alert(error.message))
  }

  return (
    <div className="login">
        <Link to = "/">

         <FontAwesomeIcon icon={faDove} className="bird-icons" role="img" aria-label="bird" />
        </Link>

        <div className='login_container'>
          <h1 >Sign-in or Sign Up</h1>
          <form>
          <h5>Email</h5>
          <input type="text" value={email} onChange={e => setEmail(
            e.target.value
          )}></input>
          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
          <button type="submit"className='login_signin' onClick={signin}>Sign In</button>
          </form>
          
          <button onClick={signUp} className='login__registerButton'>Create your Account</button>
        </div>
        </div>
  )
}

export default Login