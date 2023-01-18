const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const crypto = require("crypto");

//Importing user context
const User = require("../Model/user");

//JWT SECRET

const JWT_SECRET = process.env.JWT_SECRET;

//Register
router.post("/register", async (req, res) => {
    try{
        //Get user input
        const { firstName, username, email, password } = req.body;
        // console.log(req.body);

        //Validate user input
        if(!(email && password && firstName && username)){
            res.status(400).send("All input is required");
        }

        //Check if user exits and validate if user exits
        const oldUser = await User.findOne({email});

        if(oldUser) {
            return res.status(409).send("User Already Exists. Please LogIn")
        }

        //Encrypt Password
        encryptedUserPassword = await bcrypt.hash(password, 13);
        console.log(encryptedUserPassword);

        //Create user instance in our database
        const user = await User.create({
            firstName: firstName,
            username: username,
            password: encryptedUserPassword,
            email: email.toLowerCase()
        });
        
        //Save user to DB
        user.save();

        //Create Token
        const token = jwt.sign({user_id:user._id, email},
            process.env.PASS_KEY,
            { expiresIn: "5m"}
            );
            console.log("Token:", token)

        //Save user token
        user.token = token;

        //Return new user
        res.status(201).json(user);
        console.log("User created successfully");

    }catch(error){
        console.log(error.message);
    }
});


//Login
router.post("/login", async (req, res) => {
    try{
        //Get user input
        const { email, password } = req.body;

        //Validate user input
        if(!(username && email && password)){
            res.status(400).send("All input is required...")
        }
        
        //Validate if user exists in database
        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))){
            //Create token
            const token = jwt.sign({user_id: user._id, email},
                process.env.PASS_KEY,
                {expiresIn: "5m"});
                console.log("User logged in successfully")
                //Save user token
                 user.token = token;

                //User
                return res.status(200).json(user);

        };
        return res.status(400).send("Invalid Credentials...Please Register!")

    }catch(error){
        console.log(error.message);
    }
})

//Forgot Password
// router.post("/forgot-password", (req, res) => {

// })

//Reset Password
router.post("/resetpassword", (req, res) => {
    const { email } = req.body;

    //Check if user exists in DB
    if(email !== User.email) {
        res.send("User not registered")
        return;
    }

    //User exists, provide one time link
    const secret = JWT_SECRET + User.password
    const payload = {
        email: User.email,
        id: User.id
    }
    const token = jwt.sign(payload, secret, {expiresIn: "5m"})
    const link = `http://localhost:3000/resetpassword/${User.id}/${token}`
    console.log(link)
    res.send("Password reset has been sent to your email")
})

router.get("/resetpassword/:id/:token", (req, res) => {
    const { id, token } = req.params;
    res.send(req.params);
})

module.exports = router;