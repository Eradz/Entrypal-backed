const nodemailer = require("nodemailer");
const paths = require("path")
const ejs = require("ejs");
require("dotenv").config();

// const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;
const transport = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ENTRYPAL_EMAIL,
    pass: process.env.ENTRYPAL_EMAIL_PASSWORD
  }
});
const logoDir = paths.join( __dirname, "../public/assets/Logo.png")
const headerDir = paths.join( __dirname, "../public/assets/Header.png")
const frameDir = paths.join( __dirname, "../public/assets/Frame.png")
const copyDir = paths.join( __dirname, "../public/assets/Copy.png")
const githubDir = paths.join( __dirname, "../public/assets/mdi_github.png")
const twitterDir = paths.join( __dirname, "../public/assets/ri_twitter-fill.png")
const instagramDir = paths.join( __dirname, "../public/assets/ri_instagram-line.png")
const linkedinDir = paths.join( __dirname, "../public/assets/mdi_linkedin.png")

const sendEmail = (receiver, name, subject, content, directory) => {
  ejs.renderFile(
    directory,
    { content, name },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: "Entrypal",
          to: receiver,
          subject: subject,
          html: data,
          attachments:[
            {
            filename:"Header.png",
            path: headerDir,
            cid: "header"
          },
            {
            filename:"Logo.png",
            path: logoDir,
            cid: "logo"
          },
            {
            filename:"ri_instagram-line.png",
            path: instagramDir,
            cid: "instagram"
          },
            {
            filename:"ri_twitter-fill.png",
            path: twitterDir,
            cid: "twitter"
          },
            {
            filename:"mdi_linkedin.png",
            path: linkedinDir,
            cid: "linkedin"
          },
            {
            filename:"mdi_github.png",
            path: githubDir,
            cid: "github"
          },
        ]
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info);
        });
      }
    }
  );
};

module.exports = {
  sendEmail
};

