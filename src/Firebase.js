import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyApTJDWrdxi3_AZxtvC35bkZCXmtVXU0lg",
    authDomain: "reactweb-c7989.firebaseapp.com",
    projectId: "reactweb-c7989",
    storageBucket: "reactweb-c7989.appspot.com",
    messagingSenderId: "1012747557",
    appId: "1:1012747557:web:46cb476c0d612d53199ecc"
  };

  const firebaseApp = firebase.initializeApp
  (firebaseConfig);

  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()
  const provider = new firebase.auth.GoogleAuthProvider()


  export { db, auth, provider, storage };
  
