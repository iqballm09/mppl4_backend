const Withdraw = require("../../models/Withdraw");
const Merchant = require("../../models/Merchant");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

// Create payment
const createWithdraw = async(req, res) => {
    // Get payload
    const merchantID = req.merchant.id;
    // Get merchant by id
    const merchant = await Merchant.findOne({ 
        where: { id: merchantID }
    });
    if (!merchant) return res.status(404).send(`Merchant with id: ${ merchantID } is not found`);    

    // Proceed to withdraw
    if (req.body.pinNumber) {
        // Checking if pin number is correct
        const validPinNumber = await bcrypt.compare(req.body.pinNumber, merchant.pinNumber);
        if (!validPinNumber) return res.status(400).send("Invalid pin number!");
        // Update saldo on card
        const updatedIncome = merchant.income - req.body.amount;
        if (updatedIncome < 0) return res.status(200).send(`Merchant saldo with id: ${ merchant.id } is not enough`);
        merchant.set({ 
            income: updatedIncome
        });
        // Create withdraw
        const withdraw = await Withdraw.create({
            MerchantID: merchant.id,
            amount: req.body.amount,
            accountNumber: req.body.accountNumber,
            method: req.body.method,
            date: new Date().toLocaleDateString()
        });
        await merchant.save();
        await withdraw.save();
        return res.status(201).json({ merchant, withdraw });
    } else {
        return res.status(500).send("Pin number is empty");
    }
}

module.exports = createWithdraw;