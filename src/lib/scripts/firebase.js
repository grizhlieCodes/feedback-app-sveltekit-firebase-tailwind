import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, setPersistence, browserSessionPersistence, sendPasswordResetEmail } from 'firebase/auth'
import { updateProfile } from 'firebase/auth'
import { getFirestore, collection, getDoc, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import UserStore from '$lib/stores/user.js'
import LoginTimer from '$lib/stores/loginTimer.js'
import SuggestionsStore from '$lib/stores/suggestions.js'
import loginController from '$lib/stores/loginController';
import userOptions from '$lib/stores/userOptions'
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
export const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

onAuthStateChanged(auth, user => {
    loginController.setStatusAsPending()
    //If user logged in, update store with user data.
    if (user != null) {
        UserStore.setUser(user)
        // updateUserStoreWhenUserLoggedIn(user.uid)
        loginController.setStatusAsSuccess()
        console.log(user)

    }
    //Else if user not logged in, set user info to null.
    else {
        console.log('user logged out.')
        loginController.setToDefault()
        UserStore.clearUser()

    }
})

const userIsNew = (userDataObject) => {
    let userCreationTime = userDataObject.metadata.creationTime
    let userLastSignInTime = userDataObject.metadata.lastSignInTime
    console.log({ data: userDataObject, creationTime: userCreationTime, lastSignInTime: userLastSignInTime })
    let userNew = userCreationTime === userLastSignInTime
    return userNew
}




const signUpUser = (authObject, userData) => {
    createUserWithEmailAndPassword(authObject, userData.email, userData.password)
        .then((userCredential) => {
            // const returnedDataObject = userCredential.user
            // const userNew = userIsNew(returnedDataObject)
            // const userID = returnedDataObject.uid
            // if (!userNew) return
            // addNewUserFromEmailSignUp(userData, userID)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage) //Error "Cannot read properties of undefined (reading 'user')"
            // LoginTimer.setToLoadedAndComplete()
            loginController.setStatusAsError()

        })
}

const signInUser = (authObject, data) => {
    signInWithEmailAndPassword(authObject, data.email, data.password)
        .then((userCredential) => {
            const newUser = userCredential.user
            // LoginTimer.setToLoadedAndComplete()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // LoginTimer.setToLoadedAndComplete()
        })
}

const resetUsersPassword = (authObject, data, message = '') => {
    sendPasswordResetEmail(authObject, data.email)
        .then(() => {
            console.log('Password Reset sent!')
            // ..
            loginController.setToResetSent()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            // loginController.setStatusAsError()
        });

}

export const handleForm = (formState, data) => {
    loginController.setStatusAsPending()
    if (formState.state === 'signUp') {
        signUpUser(auth, data);
    } else if (formState.state === 'signIn') {
        signInUser(auth, data);
    } else if (formState.state === 'resetPassword') {
        resetUsersPassword(auth, data)
    }
}

const signInWithGoogle = (authObject, google) => {
    signInWithPopup(authObject, google)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const userNew = userIsNew(user)
            const userID = user.uid
            if (userNew) {
                addNewUserFromGoogleSignUp(user)
            }
            // console.log({ credential, user })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
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

export const updateDisplayName = (newDisplayName) => {
    updateProfile(auth.currentUser, {
        displayName: newDisplayName
    }).then(() => {
        console.log('Display name updated to ' + newDisplayName)
        UserStore.updateDisplayName(newDisplayName)
    }).catch((error) => console.log(error))
}


export const updateProfileImage = (newImageURL, message) => {
    updateProfile(auth.currentUser, {
        photoURL: newImageURL
    }).then(() => {
        UserStore.updateImage(newImageURL)
        userOptions.setToSuccess(message)
    }).catch((error) => console.log(error))
};

export const sendPasswordResetInternal = (auth, newUserEmail, message) => {
    sendPasswordResetEmail(auth, newUserEmail)
        .then(() => {
            // ..
            userOptions.setToSuccess(message)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            // loginController.setStatusAsError()
        });
};

// const signInWithGithub = (authObject, github) => {
//     signInWithPopup(authObject, github)
//         .then((result) => {
//             const credential = GithubAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             const user = result.user;
//         }).catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             const email = error.email;
//             const credential = GithubAuthProvider.credentialFromError(error);
//             console.log({ errorCode, errorMessage, email, credential })
//         });
// }

export const handleThirdPartyLogin = (signInOption) => {
    loginController.setStatusAsPending()
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

        console.log('logged user out')
    }).catch((error) => {
        console.log(error)
    })
}


//Firestore Scripts
const db = getFirestore()

export const addSuggestionToFirestore = async (suggestionObject, message) => {
    console.log('fb, this is the message: ' + message)
    let filteredDataObject = {
        name: suggestionObject.suggestionName,
        description: suggestionObject.suggestionDescription,
        link: suggestionObject.linkName
    }
    console.log(filteredDataObject)
    const addSuggestion = await addDoc(collection(db, "suggestions"), filteredDataObject);
    const docId = await addSuggestion.id
    SuggestionsStore.addSuggestion(filteredDataObject, docId)
    if (docId) {
        console.log('success, this is the message: ' + message)
        userOptions.setToSuccess(message)
    }
}

export const loadSuggestionsFromFirebase = async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "suggestions"));
    querySnapshot.forEach(doc => data = [...data, { ...doc.data(), id: doc.id }])
    SuggestionsStore.setSuggestionsOnLoad(data)
}

export const loadCommentsFromFirebase = async (suggestionID) => {
    const querySnapshot = await getDocs(collection(db, `suggestions/${suggestionID}/comments`));
    if (querySnapshot.docs.length === 0) {
        return []
    } else {
        let data = []
        querySnapshot.forEach(q => {
            data = [...data, { ...q.data() }]
        })
        return data
    }
}


//Firestore Auth Related

// export const addNewUserFromEmailSignUp = async (userDataObject, userID) => {
//     let data = {};
//     for(const prop in userDataObject){
//         if(prop !== 'password') {
//             data[prop] = userDataObject[prop]
//         }
//     }
//     const addUser = await setDoc(doc(db, "users", userID), data)
// }

// const updateUserStoreWhenUserLoggedIn = async (userID) => {
//     const docRef = doc(db, "users", userID)
//     const docSnap = await getDoc(docRef)

//     if(docSnap.exists()){
//         UserStore.setUser(docSnap.data())
//     } else {
//         console.log('document/user does not exist')
//     }

// }

// const returnUsername = (defaultUsername) => {
//     return defaultUsername.replace(/\s/gm, '').toLowerCase()
// }

// const addNewUserFromGoogleSignUp = async (userDataObject) => {
//     let data = {
//         username: returnUsername(userDataObject.displayName),
//         photoURL: userDataObject.photoURL,
//         email: userDataObject.email
//     }

//     const addUser = await setDoc(doc(db, "users", userDataObject.uid), data)
// }

