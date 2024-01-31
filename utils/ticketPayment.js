const express = require("express")
const  router = express.Router()
const axios = require("axios")

router.post('/', async(req, res)=>{
    const {email, amount} = req.body
    const key = process.env.PAYSTACK_API_KEY
    const data = {
        email:email, 
        amount: amount * 100, 
        key,
    callback: function(response){
        const reference = response.reference
       res.redirect("https://www.google.com")
    },
    onClose: function(){
        res.status(400).json({message: "Transaction was not completed, window closed."})
    }
    }
   const response = await axios.post("https://api.paystack.co/transaction/initialize", data,  {
    headers: {
    'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    }
  } )
  console.log(response)
   res.status(200).json({message: response.data.data.authorization_url})
   res.redirect(response.data.data.authorization_url)
})

module.exports = router