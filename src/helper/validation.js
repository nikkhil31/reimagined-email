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

    return JSON.stringify(error) === '{}' ? false : error 
}


export const isLoginValid = (form,type) => {
    const error = {}
    if (!form?.name && type === 1) {
        error.name = 'Name is must be required!'
    } else {
        error.name = ''
    }
    
    
    if (!form?.email) {
        error.email = 'Email address is must be required!'
    } else {
        error.email = ''
    }
    
    
    if (!form?.password) {
        error.password = 'Password is must be required!'
    } else {
        error.password = ''
    }
    
    // console.log(error);
    return JSON.stringify(error) === '{}' ? false : error 
}