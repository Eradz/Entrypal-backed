const errorHandler = (error, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500
    if(error.name === "ValidationError"){
      return  res.status(400).json({message: error.message.slice(error.message.indexOf(": ") +1).split(",")[0]})
    }
    res.status(400 || statusCode).json({message: error.message,
        stack:error.stackTrace, 
        error: error.properties
    })
    next()
}

module.exports = errorHandler