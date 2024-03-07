var nodemailer = require('nodemailer');

const sendEmail =()=>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anaguchidiebere@gmail.com',
        pass: 'fyig vyip llqy pexo'
      }
    });
    
    var mailOptions = {
      from: 'anaguchidiebere@gmail.com',
      to: 'joelanagu@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

}

module.exports = sendEmail