// require the User model
const User = require("../../../models/User");
const jwt = require("jsonwebtoken");

// POST /api/v1/users/signup
const signup = async (req, res ,next) => {
    console.log(req.body);
    let { username, password, first_name, last_name, adress, city, country  } = req.body;

    const user = new User({
        username: username,
        first_name: first_name,
        last_name: last_name,
        adress: adress,
        city: city,
        country: country
    });
    await user.setPassword(password);
    await user.save().then(result => {
        let token = jwt.sign({
            uid: result._id,
        }, "MyVerySecretWord");
        
        res.json({
            status: "success",
            data: {
                token: token
            }
        })
    }).catch(error => {
        console.log(error);
        res.json({
            status: "error",
            message: error.message
        });
    });
};

// POST /api/v1/users/login
const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        if(!result.user){
            return res.json({
                status: "failed",
                message: "Login failed"
            });
        }

        let token = jwt.sign({
            uid: result.user._id,
        }, "MyVerySecretWord");
        
        return res.json({
            status: "success",
            data: {
                token: token,
            }
        });
    }).catch(error => {
        res.json({
            status: "error",
            message: error.message
        });
    });
}; 

// POST /api/v1/users/change-password
const changePassword = async (req, res, next) => {
    const { username, oldPassword, newPassword } = req.body;

    // Authenticate the user
    const authenticationResult = await User.authenticate()(username, oldPassword).catch(error => {
        res.json({
            status: "error",
            message: error.message
        });
    });

    if (authenticationResult && authenticationResult.user) {
        // Change the password using passport-local-mongoose method
        authenticationResult.user.changePassword(oldPassword, newPassword, function(err) {
            if (err) {
                res.json({
                    status: "error",
                    message: err.message
                });
            } else {
                res.json({
                    status: "success",
                    message: "Password changed"
                });
            }
        });
    } else {
        res.json({
            status: "error",
            message: "Authentication failed"
        });
    }
};

const checkAdmin = async (req, res, next) => {
    try{
        const { token } = req.params;
        const decodedToken = jwt.verify(token, "MyVerySecretWord");
        const uid = decodedToken.uid;
        const user = await User.findById(uid);
        const admin = user.admin;
        res.json({
            status: "success",
            data: {
                admin: admin
            }
        });
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        });
    }

}

//get user from token 
const getUser = async (req, res, next) => {
    try{
        const { token } = req.params;
        const decodedToken = jwt.verify(token, "MyVerySecretWord");
        const uid = decodedToken.uid;
        const user = await User.findById(uid);
        res.json({
            status: "success",
            data: {
                user: user
            }
        });
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        });
    }

}

//get costumer infor from id
const getCostumer = async (req, res, next) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.json({
            status: "success",
            data: {
                user: user
            }
        });
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        });
    }

}

module.exports.signup = signup;
module.exports.login = login;
module.exports.changePassword = changePassword;
module.exports.checkAdmin = checkAdmin;
module.exports.getUser = getUser;
module.exports.getCostumer = getCostumer;