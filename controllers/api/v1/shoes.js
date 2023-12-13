// require the Shoe model
const Shoe = require("../../../models/Shoe");

// post a shoe
const create = async (req, res) => {
    try {
        let shoeName = req.body.name;
        let shoe = new Shoe();
        shoe.name = shoeName;
        await shoe.save();
        res.json({
            status: "success",
            message: "POST a new shoe",
            data: [
                {
                    shoe: shoe,
                    status: "bestteling ontvangen"
                }
            ]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message,
        });
    }
}



// get all shoes
const index = async (req, res) => {
    let shoes = await Shoe.find({});
    res.json({
        status: "success",
        message: "GET all shoes",
        data: [
            {
                shoes: shoes,
            }
        ]
    });
};


module.exports.create = create;
module.exports.index = index;