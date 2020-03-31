const User = require("../models/user");
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
}

exports.signup = (req, res) =>{
    //Find Already Existing User
    User.findOne({ email : req.body.email }).exec((err, user) => {
        if(user){
            return res.status(400)
            .json(
                {
                    error : "Email Already Exists"
                }
            );
        }
        //Till Here Email is Valid
        const { name, email, password } = req.body; //Object Distructuring
        let username = shortId.generate(); //Generate Random Username using shortid Package
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({name, email, password, username, profile});
        newUser.save((err, success)=>{
            if(err){
                return res.status(400).json({
                    error : err
                })
            }

            // res.json({
            //     user : success
            // })
            res.json({
                message: 'Signup success! Please signin.'
            });
        })
    });

} 
//Signin Controller
exports.signin = (req, res) =>{
    const { email, password } = req.body;
    // check if user exist
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user: { _id, username, name, email, role }
        });
    });
} 

exports.signout = (req, res) =>{
    res.clearCookie('token');
    res.json({
        message : "Signout Success"
    });
};

exports.requireSignin = expressJwt({
    secret : process.env.JWT_SECRET
});

exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({_id : authUserId}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : "User Not Found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({_id : adminUserId}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : "User Not Found"
            });
        }
        if(user.role !== 1){
            return res.status(400).json({
                error : "Admin User Access Denied"
            });
        }
        req.profile = user;
        next();
    });
};