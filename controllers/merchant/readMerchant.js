const Merchant = require("../../models/Merchant");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

// Read all merchants
const getAllMerchants = async (req, res) => {
    try {
        const merchants = await Merchant.findAll();
        return res.status(200).json({ merchants });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// Get merchant by email --> Login
const getMerchantForLogin = async (req, res) => {
    // Check if email is already exists
    const merchant = await Merchant.findOne({
        where: { email: req.body.email }
    });
    if (!merchant) return res.status(404).send(`Merchant with email: ${req.body.email} is not found`);
    // Checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, merchant.password);
    if (!validPassword) return res.status(400).send("Invalid password!");
    // Create and assign token
    const token = jwt.sign({ id: merchant.id, email: merchant.email }, process.env.TOKEN_SECRET);
    return res.status(202).header('auth-token', token).json({ token, id: merchant.id, name: merchant.name });
}

// Get user by id
const getMerchantById = async (req, res) => {
    // Get payload
    const merchantID = req.merchant.id;
    // Get merchant by id
    const merchant = await Merchant.findOne({
        where: { id: merchantID }
    });
    if (!merchant) return res.status(404).send(`Merchant with id: ${merchantID} is not found`);
    return res.status(200).json({ merchant });
}

module.exports = {
    getAllMerchants,
    getMerchantForLogin,
    getMerchantById
}
