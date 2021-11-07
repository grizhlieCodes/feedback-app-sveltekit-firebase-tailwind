import { writable, get } from 'svelte/store'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { initializeApp } from '@firebase/app'

const user = writable({ user: null, userDisplayName: null })
const customUser = {
    subscribe: user.subscribe,
    createUser: (auth, email, password) => {
        console.log({ auth, email, password })
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = userCredential.user
                user.set(newUser)
                console.log(newUser)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })
    },
    signInUser: (auth, email, password) => {
        console.log({ auth, email, password })
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = userCredential.user
                user.set(newUser)
                console.log(newUser)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })
    },
    signOutUser: (auth) => {
        signOut(auth).then(() => {
            customUser.clearUser()
        }).catch((error) => {
            console.log(error)
        })
    },
    setUser: (userData) => {
        user.update(userObject => {
            let newObject = { ...userObject }
            newObject.user = userData
            if (userData.displayName) {
                newObject.userDisplayName = userData.displayName
            }
            console.log({ userData, newObject })
            return newObject
        })
    },
    clearUser: () => {
        user.set({ user: null, userDisplayName: null })
    },
    signInWithGoogle: (auth, googleProvider) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log({ credential, token, user })
                customUser.setUser(user)
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
}

export default customUser