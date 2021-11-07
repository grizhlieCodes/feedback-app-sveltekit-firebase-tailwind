import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: 'AIzaSyDoZZVFxM39MVjdWGSqUuiBeg8Ahq4qxHk',
    authDomain: 'feedback-app-106e5.firebaseapp.com',
    projectId: 'feedback-app-106e5',
    storageBucket: 'feedback-app-106e5.appspot.com',
    messagingSenderId: '400566585491',
    appId: '1:400566585491:web:c4a730294bca22058b2566'
})



export const auth = getAuth()
export const db = getFirestore()

//Detect auth state
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log(`${user} logged in!`)
    } else {
        console.log('user logged out.')
    }
})

// export const createUser = (auth, email, password) => {

// }