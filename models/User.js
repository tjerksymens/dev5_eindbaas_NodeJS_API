// create a mongoose schema for a user
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
});
// export the model
const User = mongoose.model('User', UserSchema);
module.exports = User;