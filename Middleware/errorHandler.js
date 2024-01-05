const errorHandler = (error, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode).json({message: error.message, stack:error.stackTrace})

  next()
}

module.exports = errorHandler