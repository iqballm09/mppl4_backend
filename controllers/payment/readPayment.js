const Payment = require("../../models/Payment");
const Merchant = require("../../models/Merchant");
const Card = require("../../models/Card");
const dotenv = require("dotenv");

dotenv.config();

const getAllPayments = async(req, res) => {
    // Get payload
    const userID = req.user.id;
    // Read card
    const card = await Card.findOne({ 
        where: { UserID: userID }
    });
    // Get all payments
    try {
        const payments = await Payment.findAll({
            where: { CardID: card.id }
        });
        return res.status(200).json({ payments });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getPaymentById = async(req, res) => {
    // Get payload
    const userID = req.user.id;
    // Read card
    const card = await Card.findOne({ 
        where: { UserID: userID }
    });
    const payment = await Payment.findOne({
        where: {
            id: req.body.id,
            CardID: card.id
        }
    });
    if(!payment) return res.status(404).send(`Payment with ID: ${req.body.id} and CardID: ${card.id} is not found`);
    return res.status(200).json({ payment });
}

const getAllPaymentMerchant = async(req, res) => {
    // Get payload
    const merchantID = req.merchant.id;
    // Get all payments
    try {
        const payments = await Payment.findAll({
            where: { MerchantID: merchantID }
        });
        return res.status(200).json({ payments });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllPayments,
    getPaymentById,
    getAllPaymentMerchant
};