import React, { useEffect, useState } from 'react'
import Post from './Post'
import './Feed.css'
import {db} from '../Firebase'
// import  db  from '../Firebase'

const Feed = () => {

  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({id: doc.id, post:doc.data()})))
    })
    
  }, [])
  return (
    <div className="feed">
     

      {posts.map(({id,post}) => {
        return <Post
        key={id}
        id={id}
        profileUrl={post.profileUrl}
        username={post.username}
        photoURL={post.photoUrl}
        caption={post.caption} 
        comments={post.comments}/>
      })}
    </div>
  )
}

export default Feed
