import {writable, get} from 'svelte/store'

const userOptions = writable({state: 'default', message: ''})

const customUserOptions = {
    subscribe: userOptions.subscribe,

    setToSuccess: (message) => {
        userOptions.set({
            state: 'success',
            message
        })
    },

    setToDefault: () => {
        userOptions.set({state: 'default', message: ''})
    }
}

export default customUserOptions;