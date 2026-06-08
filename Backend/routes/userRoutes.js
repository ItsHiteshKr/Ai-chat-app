const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');


const router = express.Router();

router.get('/', (req, res) => {
    res.send('User Route is Running Successfully');
});

router.route('/').post(registerUser);

router.post('/login', authUser);

module.exports = router;