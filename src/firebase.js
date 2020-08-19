import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCua9Mazj4Z80MWvVQMFs8dctuzeso-THU",
  authDomain: "whatsapp-clone-4c99f.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-4c99f.firebaseio.com",
  projectId: "whatsapp-clone-4c99f",
  storageBucket: "whatsapp-clone-4c99f.appspot.com",
  messagingSenderId: "111062441959",
  appId: "1:111062441959:web:b4f5d0628d4487c3532742",
  measurementId: "G-1045VHN913"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;