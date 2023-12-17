// require the Shoe model
const Shoe = require("../../../models/Shoe");
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');


const create = async (req, res) => {
    try {
      const { name, configuration, price, size } = req.body;
      const { token } = req.params;
      const decodedToken = jwt.verify(token, "MyVerySecretWord");
      const uid = decodedToken.uid;
  
      // Fetch the user from the User model
      const user = await User.findOne({ _id: uid });
  
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }
  
      // Create a new shoe with the user reference
      const shoe = new Shoe({
        name: name,
        configuration: configuration,
        price: price,
        size: size,
        user: user._id, // Assign the user reference
      });
  
      await shoe.save();
  
      res.json({
        status: 'success',
        message: 'POST a new shoe',
        data: [
          {
            shoe,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: error.message,
      });
    }
  };
  


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

// Admin moet de status (order received, order accepted, in production, order send, order arrived) van de bestelling kunnen aanpassen
const orderStatus = async (req, res) => {
    try {
        //check if the admin boolean is true
        const { admin } = req.body;
        if (admin === true) {
            const { id } = req.params;
            const shoe = await Shoe.findByIdAndUpdate(id, req.body, { new: true });
            res.json({
                status: "success",
                message: "UPDATE shoe status",
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

// de status moet geupdate worden wanneer de schoen betaald is (order accepted) en hier is geen admin status voor nodig
//wel moet er specifiek gekeken worden of de status van de schoen op order received staat en naar order accepted geupdate wordt
const paymentStatus = async (req, res) => {
    //check if the shoe status === order received
    try {
        const { id } = req.params;
        const shoe = await Shoe.findById(id);
        if (shoe.status === "Order Received" && req.body.status === "Order Accepted") {
            //update the shoe status
            const update = await Shoe.findByIdAndUpdate(id, req.body, { new: true });
            res.json({
                status: "success",
                message: "UPDATE shoe status",
                data: [
                    {
                        update
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

// de status van de schoen moet opgehaald kunnen worden
const showStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const shoe = await Shoe.findById(id);
        res.json({
            status: "success",
            message: "GET shoe status",
            data: [
                {
                    status: shoe.status
                }
            ]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message,
        });
    }
};

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
    try {
        let shoes = await Shoe.find().populate('user');
        res.json({
            status: 'success',
            message: 'GET all shoes',
            data: shoes,
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};



module.exports.create = create;
module.exports.cancel = cancel;
module.exports.orderStatus = orderStatus;
module.exports.paymentStatus = paymentStatus;
module.exports.showStatus = showStatus;
module.exports.showShoe = showShoe;
module.exports.index = index;