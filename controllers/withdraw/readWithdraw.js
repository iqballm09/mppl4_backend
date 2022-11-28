const Withdraw = require("../../models/Withdraw");
const Merchant = require("../../models/Merchant");
const dotenv = require("dotenv");

dotenv.config();

const getAllWithdraws = async (req, res) => {
    // Get payload
    const merchantID = req.merchant.id;
    // Get merchant
    const merchant = await Merchant.findOne({
        where: { id: merchantID }
    });
    // Get all withdraws
    try {
        const withdraws = await Withdraw.findAll({
            where: { MerchantID: merchant.id }
        });
        return res.status(200).json({ withdraws });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getWithdrawById = async (req, res) => {
    // Get payload
    const merchantID = req.merchant.id;
    // Get card
    const merchant = await Merchant.findOne({
        where: { id: merchantID }
    });
    const withdraw = await Withdraw.findOne({
        where: {
            id: req.body.id,
            MerchantID: merchant.id
        }
    });
    if (!withdraw) return res.status(404).send(`Withdraw with id: ${req.body.id} and MerchantID: ${merchant.id} is not found`);
    return res.status(200).json({ withdraw });
}

module.exports = {
    getAllWithdraws,
    getWithdrawById
};