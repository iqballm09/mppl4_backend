const Payment = require("../../models/Payment");
const bcrypt = require("bcryptjs");
const Card = require("../../models/Card");
const dotenv = require("dotenv");
const Merchant = require("../../models/Merchant");
const User = require("../../models/User");

dotenv.config();

// Create payment
const createPayment = async(req, res) => {
    // Get payload
    const userID = req.user.id;
    // get user data
    const user = await User.findOne({
        where: { id: userID }
    });
    if (!user) return res.status(404).send(`User with email: ${ userID } is not found`);
    // Read card
    const card = await Card.findOne({ 
        where: { UserID: userID }
    });
    if (!card) return res.status(404).send(`Card with UserID: ${ userID } is not found`);    
    // Get merchant by id
    const merchant = await Merchant.findOne({
        where: { id: req.body.merchantID }
    });
    if (!merchant) return res.status(404).send(`Merchant with id: ${ req.body.merchantID } is not found`);
    // Proceed to payment
    if (req.body.pinNumber) {
        // Checking if pin number is correct
        const validPinNumber = await bcrypt.compare(req.body.pinNumber, card.pinNumber);
        if (!validPinNumber) return res.status(400).send("Invalid pin number!");
        // Update saldo on card
        const updatedSaldo = card.saldo - req.body.amount;
        if (updatedSaldo < 0) return res.status(200).send(`Card saldo with CardID: ${card.id} is not enough`);
        card.set({ 
            saldo: updatedSaldo
        });
        // Update income of merchant
        const updatedIncome = merchant.income + req.body.amount;
        merchant.set({
            income: updatedIncome
        });
        // Create payment
        const payment = await Payment.create({
            name_user: user.name,
            CardID: card.id,
            amount: req.body.amount,
            MerchantID: merchant.id,
            foodcourtName: req.body.foodcourtName,
            merchantName: merchant.name,
            date: new Date().toLocaleDateString()
        });
        await payment.save();
        await card.save();
        await merchant.save();
        return res.status(201).json({ payment, merchant, card });
    } else {
        return res.status(500).send("Pin number is empty");
    }
}

module.exports = createPayment;
