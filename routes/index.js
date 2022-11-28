const router = require('express').Router();
const verifyUser = require("../middleware/verifyTokenUser");
const verifyMerchant = require("../middleware/verifyTokenMerchant");

// Import controllers
const createUser = require("../controllers/user/createUser");
const { getUserForLogin, getAllUsers, getUserById, getUserByEmail } = require('../controllers/user/readUser');
const updateUser = require("../controllers/user/updateUser");
const createMerchant = require("../controllers/merchant/createMerchant");
const { getMerchantForLogin, getAllMerchants, getMerchantById } = require("../controllers/merchant/readMerchant")
const updateMerchant = require('../controllers/merchant/updateMerchant');
const { getCard, getAllCards } = require('../controllers/card/readCard');
const updateCard = require("../controllers/card/updateCard");
const createPayment = require("../controllers/payment/createPayment");
const { getPaymentById, getAllPayments } = require("../controllers/payment/readPayment");
const createUserTopUp = require("../controllers/topupUser/createTopupUser");
const { getAllUserTopUps, getUserTopUpById } = require("../controllers/topupUser/readTopupUser");
const createCashierTopUp = require("../controllers/topupCashier/createTopupCashier");
const { getAllCashierTopUps, getCashierTopUpById } = require("../controllers/topupCashier/readTopupCashier");
const createWithdraw = require("../controllers/withdraw/createWithdraw");
const { getAllWithdraws, getWithdrawById } = require("../controllers/withdraw/readWithdraw");

// User endpoints
/* Register - Login */
router.post('/users/register', createUser);
router.post('/users/login', getUserForLogin); // token ada pada header 'auth-token'
/* Get and update */
router.get('/users', getAllUsers);
router.get("/users/id", verifyUser, getUserById);
router.get("/users/email", getUserByEmail);
router.put('/users/id/edit', verifyUser, updateUser);

// Merchant endpoints
/* Register - Login */
router.post('/merchants/register', createMerchant);
router.post('/merchants/login', getMerchantForLogin); // token ada pada header 'auth-token'
/* Get and update */
router.get('/merchants', getAllMerchants);
router.get("/merchants/id", verifyMerchant, getMerchantById);
router.put('/merchants/id/edit', verifyMerchant, updateMerchant);

// Payment endpoints
router.post('/payments/cardID', verifyUser, createPayment); // QR code
router.get('/payments/cardID', verifyUser, getAllPayments); // By card id
router.get('/payments/id/cardID', verifyUser, getPaymentById);

// Topup - User endpoints
router.post('/userTopups/cardID', verifyUser, createUserTopUp);
router.get('/userTopups/cardID', verifyUser, getAllUserTopUps); // By card id
router.get('/userTopups/id/cardID', verifyUser, getUserTopUpById);

// Topup - Cashier (Merchant) endpoints
router.post('/cashierTopups/cardID/merchantID', createCashierTopUp);
router.get('/cashierTopups/merchantID', verifyMerchant, getAllCashierTopUps); // By merchant id
router.get('/cashierTopups/id/merchantID', verifyMerchant, getCashierTopUpById);

// Card endpoints
router.get('/cards', getAllCards);
router.get('/cards/id/userID', verifyUser, getCard);
router.put('/cards/id/userID/edit', verifyUser, updateCard);

// Withdraw endpoints
router.post('/withdraws/merchantID', verifyMerchant, createWithdraw);
router.get('/withdraws/merchantID', verifyMerchant, getAllWithdraws); // By merchant id
router.get('/withdraws/id/merchantID', verifyMerchant, getWithdrawById);


module.exports = router;
