//create functions that return the new mailoptions
function forgottenPassword(mailOptions) {
    return {
        subject: "Password reset code",
        text: `Your password reset code is: ${mailOptions.code}`,
        html:  `Your password reset code is: <b> ${mailOptions.code} </b>`
    }
}