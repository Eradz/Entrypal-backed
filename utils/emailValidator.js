const emailValidator=(email)=>{
    if(email.includes("@gmail.com")){
        return true
    }else if(email.includes("@yahoo.com")){
        return true
    }else if(email.includes("@outlook.com")){
        return true
    }else{
        return false
    }
}

module.exports = emailValidator