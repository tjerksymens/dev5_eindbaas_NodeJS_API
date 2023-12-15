// require the Shoe model
const Shoe = require("../../../models/Shoe");

// Post a shoe haalt gegevens van de schoen configuratie van three.js (contactgegevens van de klant moeten hier nog bijkomen)
const create = async (req, res) => {
    try {
        const { name, configuration, price, size } = req.body;

        const shoe = new Shoe({
            name: name,
            configuration: configuration,
            price: price,
            size: size
        });

        await shoe.save();

        res.json({
            status: "success",
            message: "POST a new shoe",
            data: [
                {
                    shoe
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

// Admin moet bestelling van schoen kunnen verwijderen
const cancel = async (req, res) => {
    try {
        //check if the admin boolean is true
        const { admin } = req.body;
        if (admin === true) {
            const { id } = req.params;
            const shoe = await Shoe.findByIdAndDelete(id);
            res.json({
                status: "success",
                message: "DELETE a shoe",
                data: [
                    {
                        shoe
                    }
                ]
            });
        } else {
            res.status(403).json({
                status: 'error',
                message: 'Forbidden: Admin access required',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message,
        });
    }
};

// Admin moet de status (In productie, Verzonden, Geleverd) van de bestelling kunnen aanpassen


// Get a shoe by id haalt de schoen op met de bijbehorende configuratie op om bijvoorbeeld delen van schoen op social media
const showShoe = async (req, res) => {
    const { id } = req.params;
    const shoe = await Shoe.findById(id);
    try {
        res.json({
            status: "success",
            message: "GET a shoe",
            data: [
                {
                    shoe
                }
            ]
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message,
        });
    }
}

// Get all shoes (haal alle bestellingen op van de schoenen die gemaakt zijn) eventuele filter opties
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
module.exports.cancel = cancel;
module.exports.showShoe = showShoe;
module.exports.index = index;