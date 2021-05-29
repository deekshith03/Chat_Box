import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";



const firebaseConfig = {
  apiKey: "AIzaSyDh64FWAf6TV5_nk68x9pTSAlhSTxctFxo",
  authDomain: "chatbox-5d79c.firebaseapp.com",
  projectId: "chatbox-5d79c",
  storageBucket: "chatbox-5d79c.appspot.com",
  messagingSenderId: "685840985183",
  appId: "1:685840985183:web:ee25b7a9456c806c4c3fea",
  measurementId: "G-KY2S6QZQHS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
