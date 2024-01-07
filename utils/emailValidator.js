const validator = require("validator")

const emailValidator = (email) => {
    // if(email.includes("@gmail.com")){
    //     return true
    // }else if(email.includes("@yahoo.com")){
    //     return true
    // }else if(email.includes("@outlook.com")){
    //     return true
    // }else{
    //     return false
    // }
    if(validator.isEmail(email)){
        return true
    }
    return false
}

module.exports = emailValidator