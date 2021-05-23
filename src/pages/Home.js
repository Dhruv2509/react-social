import React from "react";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import SingInBtn from "../components/SingInBtn";
import './Home.css'

function Home() {
  return (
    <div className="home">
      <Navbar />
      <CreatePost />
      <Feed />
    </div>
  )
}

export default Home;
