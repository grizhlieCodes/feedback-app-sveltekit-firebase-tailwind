import { writable, get } from 'svelte/store'

const userStore = writable({ user: null })

const customUser = {
    subscribe: userStore.subscribe,

    setUser: (userData) => {
        userStore.set({ 
            user: {...userData}
        })
        console.log(get(userStore))
    },

    clearUser: () => {
        console.log('clearing user store')
        userStore.set({ user: null })
    },
}

export default customUser