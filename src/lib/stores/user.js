import { writable, get } from 'svelte/store'

const userStore = writable({ user: null })

const customUser = {
    subscribe: userStore.subscribe,

    setUser: (userData) => {
        userStore.set({ 
            user: {...userData}
        })
        // console.log(get(userStore))
    },

    clearUser: () => {
        console.log('clearing user store')
        userStore.set({ user: null })
    },

    updateDisplayName: (newDisplayName) => {
        userStore.update(user => {
            user.user.displayName = newDisplayName
            return user
        })
        console.log(get(userStore))
    },

    updateEmail: (newEmail) => {
        userStore.update(user => {
            user.user.email = newEmail
            return user
        })
        console.log(get(userStore))
    },

    updateImage: (newImage) => {
        userStore.update(user => {
            user.user.photoURL = newImage
            return user
        })
        console.log(get(userStore))
    },

}

export default customUser