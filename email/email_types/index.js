const Finalise = require('./finalise.js')
const Cancel = require('./cancel.js')
const Response = require('./response.js')
const ForgottenPassword = require('./forgottenPassword.js')
//compile all email types and export.
module.exports = {
    Finalise,
    Cancel,
    Response,
    ForgottenPassword
}