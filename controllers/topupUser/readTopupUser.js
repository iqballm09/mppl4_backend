const TopUpUser = require("../../models/TopUpUser");
const Card = require("../../models/Card");
const dotenv = require("dotenv");

dotenv.config();

const getAllUserTopUps = async (req, res) => {
    // Get payload
    const userID = req.user.id;
    // Read card
    const card = await Card.findOne({
        where: { UserID: userID }
    });
    if (!card) return res.status(404).send(`Card with UserID: ${ userID } is not found`);
    // Read topups
    try {
        const userTopups = await TopUpUser.findAll({
            where: { CardID: card.id }
        });
        res.status(200).json({ userTopups })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getUserTopUpById = async (req, res) => {
    // Get payload
    const userID = req.user.id;
    // Read card
    const card = await Card.findOne({
        where: { UserID: userID }
    });
    if (!card) return res.status(404).send(`Card with UserID: ${ userID } is not found`);
    // Read topup by id
    const userTopup = await TopUpUser.findOne({
        where: {
            id: req.body.id,
            CardID: card.id
        }
    });
    if (!userTopup) return res.status(404).send(`Top up with id: ${ req.body.id } and card id: ${ card.id } is not found`);
    return res.status(200).json({ userTopup });
}

module.exports = {
    getAllUserTopUps,
    getUserTopUpById
}