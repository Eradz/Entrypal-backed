const qrCode = require("qrcode")
const uploadImage = require('./cloudinary')
const qrCodeGenerator = async (text) =>{
    try {
        // Generate QR code data URL
        const qrCodeDataUrl = await qrCode.toDataURL(text);
        console.log(qrCodeDataUrl);
        const qrcodelink = await (await uploadImage(qrCodeDataUrl, text)).secure_url
        console.log(qrcodelink)
        return qrcodelink
      } catch (err) {
        console.error(err);
      }
}

module.exports = qrCodeGenerator