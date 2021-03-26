const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/user');


const userRouter = express.Router();

userRouter.post('/register', 
    [
        check("username", "Please enter a valid username").not().isEmpty(),
        check("password", "Please enter a valid password").isLength({
            min: 8 // this can be updated to whatever password requirements
        })
    ],
    registerUser
)

userRouter.post('/login', 
    [
        check("username", "Please enter a valid username").not().isEmpty(),
        check("password", "Please enter a valid password").isLength({
            min: 8 // this can be updated to whatever password requirements
        })
    ],
    loginUser
)

module.exports = userRouter;