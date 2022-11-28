const Merchant = require("../../models/Merchant");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const updateMerchant = async (req, res) => {
    let hashNewPassword, updatedPassword;
    let hashNewPin, updatedPin;
    // Get payload
    const merchantID = req.merchant.id;
    const merchant = await Merchant.findOne({
        where: { id: merchantID }
    });
    if (!merchant) return res.status(404).send(`Merchant with id: ${merchantID} is not found`);
    // Change password. StatusCP = Status of Change Password
    if (req.body.statusCP === true) {
        if (req.body.oldPassword) {
            // Checking if old password is correct
            const validOldPassword = await bcrypt.compare(req.body.oldPassword, merchant.password);
            if (!validOldPassword) return res.status(400).send("Invalid password!");
            else {
                const salt = await bcrypt.genSalt(15);
                hashNewPassword = await bcrypt.hash(req.body.newPassword, salt);
            }
        } else {
            return res.status(500).send("Old password is empty");
        }
    }
    // Change pin number. statusCPN = Status of Change Pin Number
    if (req.body.statusCPN === true) {
        if (req.body.oldPinNumber) {
            // Checking if old password is correct
            const validOldPinNumber = await bcrypt.compare(req.body.oldPinNumber, merchant.pinNumber);
            if (!validOldPinNumber) return res.status(400).send("Invalid pin number!");
            else {
                const salt = await bcrypt.genSalt(16);
                hashNewPin = await bcrypt.hash(req.body.newPinNumber, salt);
            }
        } else {
            return res.status(500).send("Old pin number is empty");
        }
    }
    // Update password
    updatedPassword = hashNewPassword;
    if (!updatedPassword) {
        updatedPassword = merchant.password;
    }
    // Update pin number
    updatedPin = hashNewPin;
    if (!updatedPin) {
        updatedPin = merchant.pinNumber;
    }
    // Update another fields
    merchant.set({
        name: req.body.name,
        password: updatedPassword,
        pinNumber: updatedPin,
        location: req.body.location,
        photo: req.body.photo
    });

    await merchant.save();

    // Get updated merchant
    const updatedMerchant = await Merchant.findOne({
        where: { id: merchantID }
    });
    return res.status(201).json({ updatedMerchant });
}

module.exports = updateMerchant;