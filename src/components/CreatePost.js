import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/user'
import './CreatePost.css'
import SingInBtn from './SingInBtn'

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { db, storage } from '../Firebase';
import makeid from '../helper/function';
import firebase from 'firebase'

const CreatePost = () => {
  const [user, setUser] = useContext(UserContext).user
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0])

      var selectedImageSrc = URL.createObjectURL(e.target.files[0])

      var imagePreview = document.getElementById("image-preview")

      imagePreview.src = selectedImageSrc;
      imagePreview.style.display = "block"
    }
  }

  const handleUpload = () => {
    if(image) {
      var imageName = makeid(10)
      const uploadTask = storage.ref(`image/${imageName}.jpg`)
      .put(image); //save the image

      uploadTask.on("state_changed", (snapshot) => {
        //progress function 
        const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
        setProgress(progress)
      }, (error) => {
        console.log(error)
      },  () => {
        //get download url and upload the post info
        // const url = await storage.ref("image").child(`${imageName}.jpg`)
        // .getDownloadURL()
        // console.log(url)
        storage.ref("image").child(`${imageName}.jpg`)
        .getDownloadURL()
        .then((imageUrl) => {
          console.log(imageUrl)
            db.collection('posts').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            photoUrl:imageUrl,
            username: user.email.replace("@gmail.com",""),
            profileUrl: user.photoURL
          })
        })
        // await db.collection('posts').add({
        //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //       caption: caption,
        //       photoUrl:url,
        //       username: user.email.replace("@gmail.com",""),
        //       profileUrl: user.photoURL
        //     })
        setCaption("")
        setProgress(0)
        setImage(null)

        document.getElementById("image-preview").style.display="none"
      })
    }
  }


  return (
    <div className="createPost">
      {user ? (
        <div className="createPost_loggedIn">
          <p>Create Post</p>
          <div className="createPost_loggedInCenter">
            <textarea className="createPost_textarea"
            placeholder="Enter caption..."
              rows='3' 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <div className="createPost_imagePreview">
              <img id="image-preview"  alt="" />
            </div>
          </div>
          <div className="createPost_loggedInBottom">
            <div className="createPost_imageUpload">
              <label htmlFor="fileInput">
                <AddAPhotoIcon style={{cursor:"pointer", fontSize:'20px'}} />
              </label>
              <input id="fileInput" type='file' accept='image/*' onChange={handleChange} />
            </div>
            <button onClick={handleUpload} 
            className="createPost_uploadBtn"
            style={{color: caption ? "#000" : 'lightgrey'}}
            >{`Upload ${progress !=0 ? progress : ""}`}</button>
          </div>
        </div>
      ) : (
        <div>
          <SingInBtn />
          <p style={{marginLeft: "12px"}}>to Post and Comment</p>
        </div>
      ) }
    </div>
  )
}

export default CreatePost
