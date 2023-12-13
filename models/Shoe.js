// create a mongoose schema for a shoes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShoeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});
// export the model
const Shoe = mongoose.model('Shoe', ShoeSchema);
module.exports = Shoe;