const sendCookies = (name, value, res) =>{
    const developmentOptions = {
      domain: null,
      httpOnly: true,
      expires: new Date(Date.now() + 2592000000),
      sameSite: "Lax",
      }
    const productionOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 2592000000),
      }
      process.env.NODE_ENV === 'DEVELOPMENT' ? res.cookie(name, value, developmentOptions) : res.cookie(name, value, productionOptions)
    res.cookie(name, value, options)
}

module.exports = {sendCookies}