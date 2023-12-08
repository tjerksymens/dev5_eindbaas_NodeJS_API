// create a mongoose schema for a shoes
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShoeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});
// export the model
const Shoe = mongoose.model('Shoe', ShoeSchema);
module.exports = Shoe;