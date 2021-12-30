import { writable, get } from 'svelte/store';
import userStore from '$lib/stores/user.js';
import loginController from '$lib/stores/loginController.js';

const showComponent = writable('auth')

const customShowComponent = {
    subscribe: showComponent.subscribe,

    updateShowComponent: (showNew) => {
        showComponent.set(showNew)
    },

    updateOnMount: () => {
        if(get(userStore).user && get(loginController).status === 'complete'){
            showComponent.set('suggestions')
        } else {
            showComponent.set('auth')
        }
    },

    setToAuth: () => {
        showComponent.set('auth')
    }
}

export default customShowComponent