import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyB1u3SvDixK-AoRuSpZGPQJS1cxXfILoP4",
    authDomain: "blog-6a1eb.firebaseapp.com",
    projectId: "blog-6a1eb",
    storageBucket: "blog-6a1eb.appspot.com",
    messagingSenderId: "999694800230",
    appId: "1:999694800230:web:3c17f3ee33bc3f2a7f24a7"
  };
if(!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}