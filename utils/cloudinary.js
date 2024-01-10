const cloudinary = require('cloudinary').v2
const streamifier = require("streamifier")

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
 })
   const CloudinarySingleupload = (image) =>{
    // image = req.files.image.data
    return new Promise((resolve, reject) => {

   let cld_upload_stream = cloudinary.uploader.upload_stream({ 
   use_filename: true}, (err, result)=>{
    if(err){
        reject(err)
        console.log(err)
    }if (result){
        resolve(result)
        console.log(result)
    }
})
   streamifier.createReadStream(image).pipe(cld_upload_stream);
})}

module.exports = CloudinarySingleupload