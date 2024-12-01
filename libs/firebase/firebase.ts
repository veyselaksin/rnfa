// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCnPEjIv-MV1WK1jNjVOWBdp3sdLmwytX4',
    authDomain: 'rnfa-d3729.firebaseapp.com',
    projectId: 'rnfa-d3729',
    storageBucket: 'rnfa-d3729.firebasestorage.app',
    messagingSenderId: '1090699007001',
    appId: '1:1090699007001:web:140f361cdab0816bdbc688'
}

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP)

export const FIREBASE_DB = getFirestore(FIREBASE_APP)
