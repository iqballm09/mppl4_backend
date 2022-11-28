const Merchant = require("../../models/Merchant");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

// Create user
const createMerchant = async (req, res) => {
    try {
        // Check if email has been saved in storage
        const emailExist = await Merchant.findOne({
            where: { email: req.body.email }
        });
        if (emailExist) return res.status(400).send(`Email: ${req.body.email} has been used!`);
        // Hash password
        const saltMerchant = await bcrypt.genSalt(15);
        const hashPassword = await bcrypt.hash(req.body.password, saltMerchant);
        // Insert pin number
        const saltPin = await bcrypt.genSalt(16);
        const hashPin = await bcrypt.hash(req.body.pinNumber, saltPin);
        // Create new user
        const merchant = await Merchant.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            phoneNumber: req.body.phoneNumber,
            pinNumber: hashPin
        });
        await merchant.save();
        return res.status(201).json({ merchant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = createMerchant;