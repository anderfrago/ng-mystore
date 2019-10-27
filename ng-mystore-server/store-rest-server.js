"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, shortDescription, description, categories, images) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.shortDescription = shortDescription;
        this.description = description;
        this.categories = categories;
        this.images = images;
    }
    return Product;
}());
var products = [
    new Product(0, "Bat Product", 24.99, 4.3, "This is a short description of the First Product", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["electronics", "hardware"], "http://placehold.it/820x320"),
    new Product(1, "Second Product", 64.99, 3.5, "This is a short description of the Second Product", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["books"], "http://placehold.it/820x320"),
    new Product(2, "Third Product", 74.99, 4.2, "This is a short description of the Third Product", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["electronics"], "http://placehold.it/820x320"),
    new Product(3, "Fourth Product", 84.99, 3.9, "This is a short description of the Fourth Product", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["hardware"], "http://placehold.it/820x320"),
    new Product(4, "Fifth Product", 94.99, 5, "This is a short description of the Fourth Product", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["electronics", "hardware"], "http://placehold.it/820x320"),
    new Product(5, "Sixth Product", 54.99, 4.6, "This is a short description of the Fourth Product", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["books"], "http://placehold.it/820x320")
];
function getProducts() {
    return products;
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/products', bodyParser.json(), function (req, res) {
    var pNew = new Product(products.length + 1, req.body.title, req.body.price, req.body.rating, req.body.shortDescription, req.body.description, req.body.categories, req.body.images);
    products.push(pNew);
    res.status(200).send({
        id: pNew.id,
        title: pNew.title,
        price: pNew.price,
        rating: pNew.rating,
        shortDescription: pNew.shortDescription,
        description: pNew.description,
        categories: pNew.categories,
        images: pNew.images
    });
});
app.get('/', function (req, res) {
    res.send('The URL of products is http://localhost:8000/products');
});
app.get('/products', function (req, res) {
    res.json(getProducts());
});
function getProductsById(productId) {
    var p;
    p = products.find(function (p) { return p.id == productId; });
    return p;
}
app.get('/products/:id', function (req, res) {
    res.json(getProductsById(parseInt(req.params.id)));
});
function updateProductsById(req, productId) {
    var p;
    p = products.find(function (p) { return p.id == productId; });
    var index = products.indexOf(p);
    p.title = req.body.title,
        p.price = req.body.price,
        p.rating = req.body.rating,
        p.shortDescription = req.body.shortDescription,
        p.description = req.body.description,
        p.categories = req.body.categories,
        p.images = req.body.images;
    products[index] = p;
    return p;
}
app.put('/products/:id', function (req, res) {
    res.json(updateProductsById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});
function deleteProductsById(productId) {
    var p;
    p = products.find(function (p) { return p.id == productId; });
    var index = products.indexOf(p);
    delete products[index];
    return p;
}
app.delete('/products/:id', function (req, res) {
    res.json(deleteProductsById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
var server = app.listen(8000, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
