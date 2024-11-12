const router = require("express").Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Register a new user
const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        
        
        const { error } = validateRegistration(req.body);
        console.log(req.body.fname)
        if (error) return res.status(400).send({ message: error.details[0].message });

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(409).send({ message: "User with given email already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Validation functions
const validateRegistration = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("firstName"),
        lastName: Joi.string().required().label("lastName"),
        email: Joi.string().email().required().label("email"),
        password: Joi.string().min(6).required().label("password"),
    });
    return schema.validate(data);
};

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("email"),
        password: Joi.string().min(6).required().label("password"),
    });
    return schema.validate(data);
};

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
