// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    admin: {
        type: Boolean,
        default: false
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    adres: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
});
UserSchema.plugin(passportLocalMongoose);

// declare User model
const User = mongoose.model('User', UserSchema);

// export the model
module.exports = User;