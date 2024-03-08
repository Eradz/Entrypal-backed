const nodemailer = require("nodemailer");
const ejs = require("ejs");
require("dotenv").config();

// const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anaguchidiebere@gmail.com',
    pass: 'fyig vyip llqy pexo'
  }
});

const sendEmail = (receiver, subject, content) => {
  ejs.renderFile(
    __dirname + "/templates/welcome.ejs",
    { receiver, content },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: "email_username",
          to: receiver,
          subject: subject,
          html: data,
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        });
      }
    }
  );
};

module.exports = {
  sendEmail,
};

// var nodemailer = require('nodemailer');

// const sendEmail =()=>{
//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'anaguchidiebere@gmail.com',
//         pass: 'fyig vyip llqy pexo'
//       }
//     });
    
//     var mailOptions = {
//       from: 'anaguchidiebere@gmail.com',
//       to: 'anaguchidiebere35@gmail.com',
//       subject: 'Sending Email using Node.js',
//       text: `Testing using Gail to Gmail, If it'll be stored as spam/update/primary message`
//     };
    
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });

// }

// module.exports = sendEmail