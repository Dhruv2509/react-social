import React from 'react'

const Comment = ({ username, caption }) => {
  return (
    <div className="comment">
      <p><span style={{fontWeight:"500" , marginRight: "4PX"}}>{username}</span>{caption}</p>
    </div>
  )
}

export default Comment
