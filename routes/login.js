const express = require('express');
const router = express.Router();
const SessionService = require("../domain/service/SessionService");
const loginController = require("../controllers/login");

router.get('/', (req, res) => {
    res.render('login', {
        pageTitle: 'Login',
    });
});

router.post('/', loginController.postLogin);

router.post('/logout', async (req, res) => {
    try {
        await SessionService.destroySession(req);
        res.clearCookie('sid');
        return res.redirect('/login');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error logging out");
    }
});

module.exports = router;