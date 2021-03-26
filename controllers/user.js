const { validationResult } = require("express-validator")
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
    validationResult(req, (errors) => {
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors:errors.array()
            })
        }
    })

    const {
        username,
        password
    } = req.body

    User.findOne({username}, (err, user) => {
        if (err) throw err;
        if ( user ) {
            res.status(400).json({msg:"Username is taken"});
        }
    });

    newUser = new User({
        username, 
        password
    });

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save();
        })
    })
    const payload = {
        user: {
            id: newUser.id
        }
    };
    jwt.sign(payload, "randomString", {expiresIn:10000}, (err, token) =>{ 
        if (err) throw err;
        res.status(200).json({token});
    })
}

const loginUser = (req, res) => {
    validationResult(req, (errors) => {
        if (!errors.isEmpty() ) {
            res.status(400).json({
                errors:errors.array()
            })
        }
    });
    const {
        username,
        password
    } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.status(400).json({message: "User doesn't exist"});
        }

        bcrypt.compare(password, user.password, (err, match)=> {
            if(err) throw err;
            if (!match){
                res.status(400).json({message:"Incorrect password"});
            }
        })

        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, "randomString", {expiresIn:3600}, (err, token) => {
            if (err) throw err;
            res.status(200).json({token});
        })
    })
}

module.exports = { registerUser, loginUser };

// TODO: Setup functions for updating user, and deleting user