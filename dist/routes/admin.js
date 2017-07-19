'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadDir = _path2.default.join(__dirname, '../../uploads');

//이미지 저장되는 위치 설정


//multer 셋팅

var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, callback) {
        callback(null, uploadDir);
    },
    filename: function filename(req, file, callback) {
        callback(null, 'product-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});
var upload = (0, _multer2.default)({ storage: storage });

var router = _express2.default.Router();

router.get('/products', function (req, res) {
    _models2.default.Products.findAll({}).then(function (products) {
        res.json({ products: products });
    });
});

router.post('/products', upload.single('thumbnail'), function (req, res) {
    _models2.default.Products.create({
        product_name: req.body.product_name,
        thumbnail: req.file ? req.file.filename : "",
        price: req.body.price,
        sale_price: req.body.sale_price,
        description: req.body.description
    }).then(function () {
        res.json({ message: "success" });
    });
});

router.get('/products/:id', function (req, res) {
    _models2.default.Products.findById(req.params.id).then(function (product) {
        res.json({ product: product });
    });
});

router.put('/products/:id', upload.single('thumbnail'), function (req, res) {

    _models2.default.Products.findById(req.params.id).then(function (product) {

        if (req.file) {
            //요청중에 파일이 존재 할시 이전이미지 지운다.
            _fs2.default.unlinkSync(uploadDir + '/' + product.thumbnail);
        }
        _models2.default.Products.update({
            product_name: req.body.product_name,
            thumbnail: req.file ? req.file.filename : product.thumbnail,
            price: req.body.price,
            sale_price: req.body.sale_price,
            description: req.body.description
        }, {
            where: { id: req.params.id }
        }).then(function () {
            res.json({ message: "success" });
        });
    });
});

router.delete('/products/:id', function (req, res) {
    _models2.default.Products.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.json({ message: "success" });
    });
});

exports.default = router;