import React,{useContext} from "react";
import {useState} from 'react'
import { UserContext } from "../contexts/user";
import { signInWithGoogle } from "../services/auth";
import './SignInBtn.css'
function SingInBtn() {

  const [user,setUser] = useContext(UserContext).user

  const signInBtnClick = async () => {
    let userBySignIn = await signInWithGoogle()
    if(userBySignIn) setUser(userBySignIn)
    
  }

  return (
    <div onClick={signInBtnClick} className="signInBtn">
      <p>sign in with google</p>
    </div>
  )
}

export default SingInBtn;
