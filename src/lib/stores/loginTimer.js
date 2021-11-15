import {writable, get} from 'svelte/store';

const loginTimer = writable('')

const customLoginTimer = {
    subscribe: loginTimer.subscribe,

    setToLoading: () => {loginTimer.set('loading')},

    setToLoadedAndComplete: () => {
        loginTimer.set('loaded')
        setTimeout(() => {
            loginTimer.set('complete')
        },600)
    },

    setToBlank: () => {loginTimer.set('')}
}

export default customLoginTimer