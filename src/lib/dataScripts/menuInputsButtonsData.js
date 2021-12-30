export const menuFormData = {
    addSuggestion: {
        inputs: [
            {
                name: 'suggestionName',
                type: 'text',
                label: 'Suggestion Name',
                value: '',
                valid: true
            },
            {
                name: 'suggestionDescription',
                type: 'text',
                label: 'Suggestion Description',
                value: '',
                valid: true
            }
        ],
        button: {
            text: 'Add Suggestion',
            funcString: 'addSuggestion'
        },
        header: {
            header: 'Add Suggestion',
            description: 'Please add a suggestion name and description then submit the form.'
        },
        successMessage: {
            message: 'You have successfully added a new suggestion!'
        }
    },
    resetPassword: {
        inputs: [
            {
                name: 'email',
                type: 'email',
                label: 'Email for pass reset',
                value: '',
                valid: true,
                maxLength: 25
            }
        ],
        button: {
            text: 'Reset Password',
            funcString: 'resetPassword'
        },
        header: {
            header: 'Send Password Reset',
            description: 'Type in your email to send a password reset link.'
        },
        successMessage: {
            message: 'You have successfully sent a new password reset to your email.'
        }
    },
    updateProfileURL: {
        inputs: [
            {
                name: 'profileURL',
                type: 'text',
                label: 'Image URL',
                value: '',
                valid: true
            }
        ],
        button: {
            text: 'Update Profile Image',
            funcString: 'updateProfileURL'
        },
        header: {
            header: 'Update Profile Image',
            description: 'Please paste in the URL of your new profile image.'
        },
        successMessage: {
            message: 'You have successfully updated the URL of your display photo!'
        }
    },
    updateDisplayName: {
        inputs: [
            {
                name: 'displayName',
                type: 'text',
                label: 'Display Name',
                value: '',
                valid: true,
                maxLength: 15
            }
        ],
        button: {
            text: 'Update Display Name',
            funcString: 'updateDisplayName'
        },
        header: {
            header: 'Update Display Name',
            description: 'Type in your newly chosen display name and submit.'
        },
        successMessage: {
            message: 'You have successfully updated your display name!'
        }
    },
    updateEmail: {
        inputs: [
            {
                name: 'email',
                type: 'email',
                label: 'Email',
                value: '',
                valid: true
            }
        ],
        button: {
            text: 'Update Email',
            funcString: 'updateEmail'
        },
        header: {
            header: 'Update Email',
            description: 'You will replace your current email with this new one.'
        },
        successMessage: {
            message: 'You have successfully updated your email!'
        }
    },
};