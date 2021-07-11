import firebase from "firebase/app";
import "firebase/auth"; // 인증
import "firebase/firestore"; // firestore
import "firebase/storage"; // storage

const firebaseConfig = {
  // 인증정보
  apiKey: "AIzaSyACOYDTXDxDb24U1LVmr5eMX_9bwvgXaL0",
  authDomain: "img-community-97777.firebaseapp.com",
  projectId: "img-community-97777",
  storageBucket: "img-community-97777.appspot.com",
  messagingSenderId: "873724707334",
  appId: "1:873724707334:web:b2bb5badeb95ac327c7987",
  measurementId: "G-2NR4L4MM0L",
};

// 초기화
firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
