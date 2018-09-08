const Isemail = require('isemail');

exports.isEmailTrue = function(email){
    return (Isemail.validate(email, {errorLevel: true}) === 0)
}