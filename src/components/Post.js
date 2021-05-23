import React, { useContext, useState } from 'react'
import {UserContext} from '../contexts/user'
import { db, storage } from '../Firebase'
import Comment from './Comment'
import CommentInput from './CommentInput'
import './Post.css'

const Post = ({profileUrl, username, id, photoURL, caption, comments}) => {

  const [user, setUser] = useContext(UserContext).user

  const deletePost = () =>{
    var imageRef = storage.refFromURL(photoURL)
    //delete file from storage
    imageRef.delete().then(function(){
      console.log("delete successfull")
    }).catch(function(error){
      console.log(`Error ${error}`)
    })
    //delete from firestore
    db.collection("posts")
    .doc(id)
    .delete()
    .then(function(){
      console.log("delete successfull")
    }).catch(function(error){
      console.log(`Error ${error}`)
    })

  }

  return (
    <div className="post">
      <div className="post_header">
        <div className="post_headerLeft">
          <img className="post_profilePic" src={profileUrl} alt="" />
          <p style={{marginLeft: "8px"}}>{username}</p>
        </div>
        
      {user ? `${username}@gmail.com`==user.email ? (<button onClick={deletePost} className="post_delete">Delete</button>) : (<></>)  : (<></>)}
        
      </div>

      <div className="post_center">
        <img className="post_photoUrl" src={photoURL} />
      </div>

      <div className="">
        <p><span style={{fontWeight:"500" , marginRight: "4PX"}}>{username}</span>{caption}</p>
      </div>

      

      {comments ? (comments.map((comment) =>
      <Comment username={comment.username} caption={comment.comment} /> ))
      : (<> </>) }

      {user ? <CommentInput comments={comments} id={id}  /> : <></> }

      

    </div>
  )
}

export default Post
