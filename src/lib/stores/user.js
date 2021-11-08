import { writable, get } from 'svelte/store'

const userStore = writable({ user: null, userDisplayName: null })

const customUser = {
    subscribe: userStore.subscribe,
    setUser: (userData) => {
        userStore.update(userObject => {
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
        userStore.set({ user: null, userDisplayName: null })
    },
}

export default customUser