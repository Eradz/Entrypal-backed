const sendCookies = (name, value, res) =>{
    const options = {
        HttpOnly: true,
        expires: new Date(Date.now() + 2592000000),
      }
    res.cookie(name, value, options)
}

module.exports = {sendCookies}