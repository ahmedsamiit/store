const express = require('express');
const router = express.Router();
const productController = require("../controllers/product");
const userController = require("../controllers/user");


router.get('/', (req, res) => {
    res.render('admin', {
        pageTitle: 'Admin Dashboard',
        activeTab: "dashboard",
        products: [],
        users: [],
        haveProduct: false,
        haveUsers: false,
    });
});

router.get('/products', productController.getProducts);
router.get('/AdminUsers', userController.getUsers);
router.get('/sellers', (req, res) => {
    res.render('admin', {
        pageTitle: 'Admin - Sellers',
        activeTab: "sellers",
        products: [],
        users: [],
        haveProduct: false,
        haveUsers: false,
    });
});

router.get('/customers', (req, res) => {
    res.render('admin', {
        pageTitle: 'Admin - Customers',
        activeTab: "customers",
        products: [],
        users: [],
        haveProduct: false,
        haveUsers: false,
    });
});

router.get('/orders', (req, res) => {
    res.render('admin', {
        pageTitle: 'Admin - Orders',
        activeTab: "orders",
        products: [],
        users: [],
        haveProduct: false,
        haveUsers: false,
    });
});
router.post('/products/create', productController.postCreateProduct);
router.post('/products/update', productController.postUpdateProduct);
router.post('/products/delete', productController.postDeleteProduct);
router.post('/AdminUsers/create', userController.postCreateUser);
router.post('/AdminUsers/update', userController.postUpdateUser);
router.post('/AdminUsers/delete', userController.postDeleteUser);

module.exports = router;