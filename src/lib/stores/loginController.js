import { writable, get } from 'svelte/store';

const loginController = writable({
    status: 'default',
    showAuthModalConfirmation: false,
    errorMessages: {
        userExistsError: 'A user with this email already exists. Did you mean to sign in instead?'
    },
    confirmationMessage: {
        passwordResetSent: 'If you typed in an existing account you will receive a password reset in the email you typed.'
    }
})

const customLoginController = {
    subscribe: loginController.subscribe,

    setStatusAsPending: () => {
        loginController.update(tempController => {
            tempController.status = 'pending'
            tempController.showAuthModalConfirmation = true
            return tempController
        })
    },

    consoleLoginController: () => {
        console.log(get(loginController))
    },

    setStatusAsSuccess: () => {
        loginController.update(tempController => {
            tempController.status = 'success'
            return tempController
        })
    },

    setStatusAsError: (errorType) => {
        loginController.update(tempController => {
            tempController.status = 'error'
            return tempController
        })
    },

    completeSuccessfulAuth: () => {
        loginController.update(tempController => {
            tempController.status = 'complete'
            tempController.showAuthModalConfirmation = false
            return tempController
        })
    },

    setToDefault: () => {
        loginController.update(tempController => {
            tempController.status = 'default'
            tempController.showAuthModalConfirmation = false
            return tempController
        })
    },

    setToResetSent: () => {
        loginController.update(tempController => {
            tempController.status = 'resetSent'
            return tempController
        })
    }
}

export default customLoginController;