const express = require('express');
const User = require('../models/User');
// this is for validation ('express-validator')
const { body, validationResult } = require('express-validator');
// bcrypt is used for passwords to make it hash
const bcrypt = require('bcryptjs');
// jwt used for token verification when a user create account we give him a token as a verification
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const router = express.Router();

// This is a jwt secret through which we verify our token
const JWT_SECRET = 'Shakeebisagood$boy';


// ROUTE:1 Create a USER : POST "/api/auth/createuser". no login required
router.post('/createuser', [

    // valiation
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {

    let SUCCESS = false;

    // valiation error if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ SUCCESS, errors: errors.array() });
    }

    // check whether the user with this email exist already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ SUCCESS, error: 'Sorry a user with this email already exists' })
        }
        // to make the password secure with bcrypt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        }
        
        SUCCESS = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ SUCCESS, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



// ROUTE:2 Authenticate a USER : POST "/api/auth/login". no login required
router.post('/login', [

    // valiation
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password Cannot be blank').exists(),

], async (req, res) => {

    let SUCCESS = false;

    // valiation error if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            SUCCESS = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            SUCCESS = false;
            return res.status(400).json({ SUCCESS, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        SUCCESS = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ SUCCESS, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



// ROUTE:3 Get loggedin USER details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;