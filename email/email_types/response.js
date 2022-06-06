
function Response(mailOptions) {
    return {
        subject: `${mailOptions.user} has Updated their Status for your Event ${mailOptions.eventTitle}`,
        text: `${mailOptions.user} has updated their status to ${mailOptions.newStatus} for ${mailOptions.eventTitle}.`,
        html: `<p><b>${mailOptions.user}</b> has updated their status to <b>${mailOptions.newStatus}</b> for <b>${mailOptions.eventTitle}</b>.</p>`
    }
}

module.exports = Response;