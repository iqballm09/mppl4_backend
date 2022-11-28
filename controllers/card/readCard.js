const Card = require("../../models/Card");
const dotenv = require("dotenv");

dotenv.config();

// Read all users
const getAllCards = async (req, res) => {
    try {
        const cards = await Card.findAll();
        return res.status(200).json({ cards });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// Read card by UserID
const getCard = async (req, res) => {
    // Get payload
    const userID = req.user.id;
    // Read card
    const card = await Card.findOne({
        where: {
            UserID: userID
        }
    });
    // Check if card already exists
    if (!card) return res.status(404).send(`Card with UserID: ${userID} is not found`);
    return res.status(200).json({ card });
}

module.exports = {
    getAllCards,
    getCard
}
