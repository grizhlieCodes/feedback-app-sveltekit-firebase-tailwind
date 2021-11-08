import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firestore';
import UserStore from '$lib/stores/user.js'
import { get } from 'svelte/store';

const firebaseApp = initializeApp({
    apiKey: 'AIzaSyDoZZVFxM39MVjdWGSqUuiBeg8Ahq4qxHk',
    authDomain: 'feedback-app-106e5.firebaseapp.com',
    projectId: 'feedback-app-106e5',
    storageBucket: 'feedback-app-106e5.appspot.com',
    messagingSenderId: '400566585491',
    appId: '1:400566585491:web:c4a730294bca22058b2566'
})

//Authentication Scripts
const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

onAuthStateChanged(auth, user => {
    //If user logged in, update store with user data.
    if (user != null) {
        console.log(user)
        UserStore.setUser(user)
    } 
    //Else if user not logged in, set user info to null.
    else {
        console.log('user logged out.')
        UserStore.clearUser()
        console.log(get(UserStore))
    }
})

const signUpUser = (authObject, email, password) => {
    console.log({ auth, email, password })
    createUserWithEmailAndPassword(authObject, email, password)
        .then((userCredential) => {
            const newUser = userCredential.user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
}

const signInUser = (authObject, email, password) => {
    signInWithEmailAndPassword(authObject, email, password)
        .then((userCredential) => {
            const newUser = userCredential.user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
}

export const handleEmailLogin = (formStateSignUp, email, password) => {
    if (formStateSignUp) {
        signUpUser(auth, email, password);
    } else {
        signInUser(auth, email, password);
    }
}

const signInWithGoogle = (authObject, google) => {
    signInWithPopup(authObject, google)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // customUser.setUser(user)
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log({
                errorCode,
                errorMessage,
                email,
                credential
            })
            // ...
        });
}

const signInWithGithub = (authObject, github) => {
    signInWithPopup(authObject, github)
        .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // customUser.setUser(user)
            // console.log(get(user))
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            console.log({ errorCode, errorMessage, email, credential })
        });
}

export const handleThirdPartyLogin = (signInOption) => {
    if (signInOption === 'google') {
        signInWithGoogle(auth, googleProvider);
    } else if (signInOption === 'github') {
        signInWithGithub(auth, githubProvider);
    } else {
        console.log(`${signInOption} was picked, write a function for it.`);
    }
}

export const signOutUser = () => {
    signOut(auth).then(() => {
        // UserStore.clearUser()
        console.log('logged user out')
    }).catch((error) => {
        console.log(error)
    })
}


//Firestore Scripts
const db = getFirestore()
