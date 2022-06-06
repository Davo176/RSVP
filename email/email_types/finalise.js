const moment = require('moment')

function Finalise(mailOptions) {
    return {
        subject: "Event Finalised",
        text: `${mailOptions.eventTitle} has had its date and time finalised to ${moment.utc(mailOptions.dateTime).format("Do MMM YYYY h:mm a")}`,
        html: `<p>${mailOptions.eventTitle} has had its date and time finalised to <b>${moment.utc(mailOptions.dateTime).format("Do MMM YYYY h:mm a")}</b></p>`
    }
}

module.exports = Finalise;