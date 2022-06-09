const emailTypes = require('./email_types');
const nodemailer = require('nodemailer');

//General idea is this makes it a lot easier to send emails.
//can probably create transporter as middleware.

async function sendMail(mailName,mailArgs,emailReceivers){
    if (emailReceivers.length===0){
        return;
    }
    //create the transporter
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: 'No_Reply_RSVP_WDC_2022@outlook.com', // email sent from
            pass: 'IanKnight', // super secure having password sitting in code... Ideally would set up Vault or something
        },
        tls: {
            ciphers:'SSLv3'
        }
    });
    //convert receivers into string
    emailReceivers = emailReceivers.join(', ')
    //set up default mail options
    let mailOptions = {
        from: "No_Reply_RSVP_WDC_2022@outlook.com",
        to: emailReceivers,
        subject: "Testing",
        text: "Failed to Load Email Contents",
        html: "<b>Failed to Load Email Contents</b>"
    }
    //replace text and email based off supplied type and args
    let newMailOptions = emailTypes[mailName](mailArgs)
    //update mail options
    mailOptions.subject = newMailOptions.subject;
    mailOptions.text = newMailOptions.text;
    mailOptions.html = newMailOptions.html;
    //send mail
    try {
        let info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error")
    }

    //CAN TURN BELOW ON TO GET EMAIL PREVIEWS WHEN USING TEST ACCOUNT.
    //console.log("Message sent: %s", info.messageId);

    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendMail;