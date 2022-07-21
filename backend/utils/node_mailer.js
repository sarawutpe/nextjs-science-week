const nodemailer = require('nodemailer');

const nodeMailer = async (mail_from, mail_to, mail_subject, mail_text, mail_html) => {
  // create transporter 
  let transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    // requireTLS: true,
    auth: {
      user: 'bf217878bf14e04bec78cdc05c4a8605', // generated ethereal user
      pass: '2d79587877886aa31d80c7131b43b9f6', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: mail_from, // sender address
    to: mail_to, // list of receivers
    subject: mail_subject, // Subject line
    text: mail_text, // plain text body
    html: mail_html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}

module.exports = nodeMailer;