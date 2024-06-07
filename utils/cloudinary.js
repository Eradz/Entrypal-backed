const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
 })
   const CloudinarySingleupload = async (image, public_id) =>{
    // convert to svg
    // const SVGimage = (image) => cloudinary.image(image, { format: "svg" })
    // console.log(SVGimage(image))
    const id =  Math.floor(1000 + Math.random() * 9000)
      const result = await cloudinary.uploader.upload(image, {public_id: `${public_id}${id}`, folder: 'QR codes'})
        return result
    }

module.exports = CloudinarySingleupload