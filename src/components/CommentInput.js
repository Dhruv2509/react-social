import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/user'
import { db } from '../Firebase'
import './CommentInput.css'

const CommentInput = ({comments,id}) => {
  const [user, setUser] = useContext(UserContext).user

  const [comment, setComment] = useState("")
  const [commentArray, setCommentArray] = useState(comments ? comments : [])

  const addCommnet = () => {
    if(comment!=""){
      commentArray.push({
        comment: comment,
        username: user.email.replace("@gmail.com", ""),
      })

      db.collection("posts")
      .doc(id)
      .update({
        comments: commentArray
      })
      .then(function(){
        setComment("")
        console.log("comment added")
      })
      .catch(function(error){
        console.log(error)
      })
    }
  }
  return (
    <div className="commentInput">
      <textarea placeholder="Write a Comment"
       className="commentInput_textarea"
       value={comment}
       onChange={(e) => setComment(e.target.value)}
      rows="1"></textarea>

      <button onClick={addCommnet} className="commentInput_button">Post</button>
    </div>
  )
}

export default CommentInput
