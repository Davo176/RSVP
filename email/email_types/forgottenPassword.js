//create functions that return the new mailoptions
function forgottenPassword(mailOptions) {
    return {
        subject: "Password reset code",
        text: `Your password reset code is: ${}`,
        html:  `Your password reset code is: <b> ${} </b>`
    }
}