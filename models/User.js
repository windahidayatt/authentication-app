var mongoose = require('mongoose');
 
// Buat Schema
const User = mongoose.Schema({
    nik:{
        type: String,
        required: true,
        maxlength: 16,
        minlength: 16
    },
    role:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        maxlength: 6
    }
}, {
    versionKey: false // Version key is not needed
});
 
// export model
exports.User = mongoose.model('User', User);