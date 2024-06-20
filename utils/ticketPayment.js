const axios = require("axios")

const ticketPayment = async(email, amount, metadata)=>{
    const APIkey = process.env.PAYSTACK_API_KEY
    const secretKey = process.env.PAYSTACK_SECRET_KEY
    const data = {
        email:email, 
        amount: amount * 100, 
        APIkey,
        metadata: JSON.stringify(metadata)
    }
   const response = await axios.post("https://api.paystack.co/transaction/initialize", data,  {
    headers: {
    'Authorization': `Bearer ${secretKey}`
    }
  } )
  console.log(response)
   return (response.data.data.authorization_url)
//    res.redirect(response.data.data.authorization_url)
}

/* response gotten from paystack
data: {
    status: true,
    message: 'Authorization URL created',
    data: {
      authorization_url: 'https://checkout.paystack.com/47vgxiuhrohknep',
      access_code: '47vgxiuhrohknep',
      reference: 'na4dkehjye'
    }
  }
}
*/
module.exports = ticketPayment