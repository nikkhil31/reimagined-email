export const isComposeValid = (form) => {
    const error = {}

    if (!form.to) {
        error.to = 'Email address is must be required!'
    }


    if (!form.subject) {
        error.to = 'Subject is must be required!'
    }


    if (!form.message) {
        error.message = 'Message is must be required!'
    }

    return error
}