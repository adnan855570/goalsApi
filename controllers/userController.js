/* This code is a module that handles user registration, login, and retrieving user data. */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // to hash our passwords 
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


//@description Register new users
// @route POST api/users
// @access public
const registerUser = asyncHandler(async(req , res) => {
    const {name , email , password} =  req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

// Check if the user exists
const userExists = await User.findOne({email})

if (userExists) {
    res.status(400); // if user exists we don't want to register again
    throw new Error("User already exists");
}

// hast the password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

//Create User
const user = await User.create({
    name , email , password : hashedPassword
})

if(user){
    res.status(201).json({
        _id : user.id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id)
    })
}else {
res.status(400);
throw new Error('Invalid user data');
}

})

//@description Login new users
// @route POST api/users/login
// @access public
const loginUser = asyncHandler(async(req , res) => {
    const {email , password} = req.body;
// check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password , user.password))) {
        res.json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else {
        res.status(400);
        throw new Error("invalid user data");
    }
})



//@description Get new users data
// @route GET api/users/me
// @access private
const getMe = asyncHandler(async(req , res) => {
    const {_id , name , email} = await User.findById(req.user.id);

    res.status(200).json({
        id : _id,
        name,
        email,
    })
})

// generate JWT 
const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn : '30d',
    })
}



module.exports = {
    registerUser,
    loginUser,
    getMe,
}