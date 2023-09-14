const asyncHandler = require("express-async-handler"); // For error-handling middleware
const bcrypt = require("bcrypt"); // For password hashing/unhashing
const jwt = require("jsonwebtoken"); // For user authentication throughout HTTP requests
const User = require("../models/userModel");

// Labels:
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    // Destructure
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    // Check whether email is available
    const userUnavailable = await User.findOne({ email });
    if(userUnavailable) {
        res.status(400);
        throw new Error("Email is already in use.");
    }

    // Create and store hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // Create the new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    console.log(`User created: ${user}`);

    if(user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid.");
    }
});

// Labels:
//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    // Destructure
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    /// See if the user exists
    const user = await User.findOne({ email });

    if(user) {console.log(`User found: ${user}`);}

    // Compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        // If password is correct, provide a JWT
        const accessToken = jwt.sign(
        {
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20m" }
    ); // For signing in (use/embed username, email, and id as payload; specify ACCESS_TOKEN_SECRET from .env, and specify expiration time)
        res.status(200).json({ accessToken });
    } else {
        response.status(401);
        throw new Error("Invalid email and/or password.");
    }
});

// Labels:
//@desc Add to current user's starred recipes
//@route PUT /api/users/recipes/:id
//@access private
const starRecipe = asyncHandler(async (req, res) => {
    // Code to "star" a recipe
    //
    // ***
    //
});

// Labels:
//@desc Get current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

// Labels:
//@desc Get current user's starred recipes
//@route GET /api/users/recipes
//@access private
const userRecipes = asyncHandler(async (req, res) => {
    // Code to retrieve "starred" recipes
    //
    // ***
    //
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};