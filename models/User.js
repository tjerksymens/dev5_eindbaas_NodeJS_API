// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({});
UserSchema.plugin(passportLocalMongoose);

// declare User model
const User = mongoose.model('User', UserSchema);

// export the model
module.exports = User;