const emailTypes = require('./email_types');
const nodemailer = require('nodemailer');

async function sendMail(mailName,mailArgs,emailReceivers){
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'No_Reply_RSVP_WDC_2022@outlook.com', // generated ethereal user
            pass: 'IanKnight', // generated ethereal password
        },
    });

    emailReceivers = emailReceivers.join(', ')
    let mailOptions = {
        from: "No_Reply_RSVP_WDC_2022@outlook.com",
        to: emailReceivers,
        subject: "Testing",
        text: "Failed to Load Email Contents",
        html: "<b>Failed to Load Email Contents</b>"
    }

    let newMailOptions = emailTypes[mailName](mailArgs)

    mailOptions.subject = newMailOptions.subject;
    mailOptions.text = newMailOptions.text;
    mailOptions.html = newMailOptions.html;

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendMail;