
function Cancel(mailOptions) {
    return {
        subject: "Event Cancelled",
        text: `${mailOptions.eventTitle} has been cancelled.`,
        html: `<p><b>${mailOptions.eventTitle}</b> has been cancelled.</p>`
    }
}

module.exports = Cancel;