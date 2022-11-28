const TopUpCashier = require("../../models/TopUpCashier");
const User = require("../../models/User");
const Merchant = require("../../models/Merchant");
const Card = require("../../models/Card");
const dotenv = require("dotenv");

dotenv.config();

const getAllCashierTopUps = async (req, res) => {
    // Get payload
    const merchantID = req.merchant.id;
    // Get merchant by id
    const merchant = await Merchant.findOne({
        where: { id: merchantID }
    });
    if (!merchant) return res.status(404).send(`Merchant with id: ${ merchantID } is not found`);
    // Read topups
    try {
        const cashierTopups = await TopUpCashier.findAll({
            where: { MerchantID: merchant.id }
        });
        res.status(200).json({ cashierTopups })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getCashierTopUpById = async (req, res) => {
    // Get payload
    const merchantID = req.merchant.id;
    // Get merchant by id
    const merchant = await Merchant.findOne({
        where: { id: merchantID }
    });
    if (!merchant) return res.status(404).send(`Merchant with id: ${ merchantID } is not found`);
    // Read topup by id
    const cashierTopup = await TopUpCashier.findOne({
        where: {
            id: req.body.id,
            MerchantID: merchant.id
        }
    });
    if (!cashierTopup) return res.status(404).send(`Cashier top up with id: ${ req.body.id } and merchant id: ${ merchant.id } is not found`);
    return res.status(200).json({ cashierTopup });
}

module.exports = {
    getAllCashierTopUps,
    getCashierTopUpById
}