const TopUpCashier = require("../../models/TopUpCashier");
const User = require("../../models/User");
const Merchant = require("../../models/Merchant");
const Card = require("../../models/Card");
const dotenv = require("dotenv");

dotenv.config();

const createCashierTopUp = async (req, res) => {
    // Get payload
    const merchantID = req.body.merchantID;
    // Get merchant by id
    const merchant = await Merchant.findOne({
        where: { id: merchantID }
    });
    if (!merchant) return res.status(404).send(`Merchant with id: ${ merchantID } is not found`);
    // Get user by email
    const user = await User.findOne({
        where: { email: req.body.email }
    });
    if(!user) return res.status(404).send(`User with email: ${ req.body.email } is not found`);
    // Get card by user id
    const card = await Card.findOne({
        where: { UserID: user.id }
    });
    // Create topup
    const cashierTopup = await TopUpCashier.create({
        MerchantID: merchant.id,
        CardID: card.id,
        amount: req.body.amount,
        date: new Date().toLocaleDateString()
    });
    // Update card saldo
    const updatedSaldo = card.saldo + req.body.amount;
    card.set({
        saldo: updatedSaldo
    });
    // // Update merchant income
    // const updatedIncome = merchant.income + 2500;
    // merchant.set({
    //     income: updatedIncome
    // });
    await cashierTopup.save();
    await card.save();
    // await merchant.save();
    return res.status(201).json({ cashierTopup, card });
}

module.exports = createCashierTopUp;