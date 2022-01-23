require('dotenv').config();
const User = require('../models/userModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

var UserControllers = {   

    auth: async(req,res) => {
        const {username, password} = req.body;

        // validation
        if (!username || !password) {
            return res
                .status(400)
                .json({
                    success: false, 
                    massage: 'Missing username and/or password'
                });
        };

        try {
            // check for existing user
            const user = await User.findOne({username});
            if(user) {
                return res
                    .status(400)
                    .json({success: false, message: 'username alreadey taken'});
            };

            // register success
            const hashPassword = await argon2.hash(password);
            const newUser = new User({
                username,
                password: hashPassword
            });
            // save new User to mongodb
            await newUser.save();

            // return Token
            const accessToken = jwt.sign({userId: newUser._id},process.env.ACCESS_TOKEN_SECRET);
            res.json({
                success: true, 
                message: 'Create user successfully',
                accessToken
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },     
    

    login: async(req,res) => {
        const {username, password} = req.body;

        // validation
        if(!username || !password) {
            return res
                .status(400)
                .json({success: false, message: 'Missing username and/or password'});
        }

        try {
            // check for existing username
            const user = await User.findOne({username});
            if(!user) {
                return res
                    .status(400)
                    .json({success: false,message: 'Username and/or Password incorrect'});
            }

            // username found
            const passwordValid = await argon2.verify(user.password, password);
            if(!passwordValid) {
                return res
                    .status(400)
                    .json({success: false,message: 'Username and/or Password incorrect'});
            }

            // Login success and return Token
            const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET);
            res.json({
                success: true, 
                message: 'Login successfully',
                accessToken
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        }
    }
};

module.exports = UserControllers;
