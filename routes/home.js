const express = require('express');
const router = express.Router();
const ProductService = require("../domain/service/ProductService");
const SessionService = require("../domain/service/SessionService");

router.get('/', async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        const user = SessionService.getUser(req);
        res.render('home', {
            pageTitle: 'Amazon Style Store',
            products,
            haveProduct: products.length > 0,
            user: user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});






module.exports = router;