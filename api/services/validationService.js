
export const emailValidation = email => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(String(email).toLowerCase())

};

export const telephoneValidation = telephone => {
    const telephoneRegex = /\(\d{2,}\) \d{4,}\-\d{4}/
    return telephoneRegex.test(telephone)

};
