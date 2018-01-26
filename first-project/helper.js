import sha256 from "sha256";
/**
 * check email valid. If valid, return true
 * if invalid, return false
 * @param {*} email
 */
 export const validtedEmail = (email) => {
     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
 }

/**
 * return hashed password followed sha256
 */
export const generatePassword = (password) => {
    return sha256(password)
}

/**
 * return true if password's length > 8
 */
export const validatePassword = (password) => {
    return password.length > 8
}