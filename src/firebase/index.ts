// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCAzYsmkfZ6EhER_vM0zLlq25G4efbbYFw',
  authDomain: 'prife-k2u-juja.firebaseapp.com',
  projectId: 'prife-k2u-juja',
  storageBucket: 'prife-k2u-juja.appspot.com',
  messagingSenderId: '464332111907',
  appId: '1:464332111907:web:94d27f6d288a3213057196',
  measurementId: 'G-95TZX8SXR5',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
