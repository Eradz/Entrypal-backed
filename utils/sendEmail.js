const nodemailer = require("nodemailer");
const paths = require("path")
const ejs = require("ejs");
require("dotenv").config();

// const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;
const transport = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.forwardemail.net",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: 'anaguchidiebere@gmail.com',
    pass: 'fyig vyip llqy pexo'
    // user: 'notifications@entrypalapp.com',
    // pass: 'EntryPalNotifications2000$'
  }
});
const directory = paths.join( __dirname, "../views/welcome.ejs")

const sendEmail = (receiver, name, subject, content) => {
  ejs.renderFile(
    directory,
    { content, name },
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

