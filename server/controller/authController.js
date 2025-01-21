require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//signup
const signupController = async(req, res) => {
    try{
        const {email, password} = req.body;
        const isExistingUser = await User.findOne({email});

        if(isExistingUser){
            return res.status(400).json({
                success: false,
                message: 'Email is already registered.'
            })
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({email, password: hashedPassword});

        return res.status(200).json({
            success: true,
            data: user,
            message: 'Signup successfully',
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

//login
const loginController = async(req, res) => {
    try{
        const {email, password} = req.body;

        const isUserExist = await User.findOne({email});
        if(!isUserExist){
            return res.status(400).json({
                success: false,
                message: 'User not found. Please signup',
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

        if(!isPasswordMatched){
            return res.status(403).json({
                success: false,
                message: 'Invalid credentials',
            })
        }

        const token = jwt.sign({
            userId: isUserExist._id
        }, process.env.JWT_SECRET, {expiresIn: '1h'})

        return res.status(200).json({
            success: true,
            token,
            message: 'Login successfully',
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}


module.exports = {signupController, loginController};
