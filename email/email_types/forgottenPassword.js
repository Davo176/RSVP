//create functions that return the new mailoptions
function forgottenPassword(mailOptions) {
    return {
        subject: "Password reset code",
        text: `Your code is: ${}`
    }
}