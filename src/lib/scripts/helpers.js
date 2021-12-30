import { get } from 'svelte/store';
import UserStore from '$lib/stores/user.js';

export const calcRealSize = (winWidth) => {
    let result;
    if (winWidth >= 950) {
        result = 'desktop';
    } else if (winWidth >= 768) {
        result = 'tablet';
    } else {
        result = 'mobile';
    }
    return result;
};

export const returnUserImage = (object) => {
    if (object.user) {
        if (object.user.photoURL) {
            return `${object.user.photoURL}`
        } else {
            return false
        }
    } else {
        return false
    }
}

export const returnUserLetter = (object) => {
    if(object.user){
        if(object.user.displayName){
            return object.user.displayName.split('')[0]
        } else {
            return object.user.email.split('')[0]
        }
    } else {
        return '0'
    }
}

export const username = (object) => {
    
}