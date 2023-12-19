// create a mongoose schema for a shoes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShoeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    configuration: {
        type: Object,
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Order Received"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    snapshot: {
        type: String,
    },
});
// export the model
const Shoe = mongoose.model('Shoe', ShoeSchema);
module.exports = Shoe;