var express = require('express');
var app = express();
let middleware = require('./middleware');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './view/img/products/')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.sku + '.jpg')
    }
});
var upload = multer({ storage: storage });
var promotion = require('../model/promotionAndSalesModel.js');

app.get('/api/getPromotionAndSales', function(req, res) {
    var countryId = req.query.countryId;

    promotion.getAllPromotion(countryId)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Failed to get Promotion and Sales by country id. Error: ${err.message}`);
        });

    console.log("Running promotionDB.js -- Getting Promotions and Sales");
});

module.exports = app;
