import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/user'
import './Navbar.css'
import SingInBtn from './SingInBtn'

const Navbar = () => {

  const [user, setUser] = useContext(UserContext).user  

  return (
    <div className="navbar">
      <p>React Social</p>
      {user ? <img className="navbar_img" src={user.photoURL} /> : <SingInBtn />}
    </div>
  )
}

export default Navbar
