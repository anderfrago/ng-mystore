const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// This module allows you to 'wrap' your API for serverless use.
// No HTTP server, no ports or sockets. 
// https://github.com/dougmoscrop/serverless-http
const serverless = require('serverless-http');

// Connecting to Mongoo Atlas database
 mongoose.connect('mongodb+srv://ander_frago:4Vientos@cluster0.wdu3m.mongodb.net/productsdb?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true
 });

const app = express();

let productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  categories: {
    type: Array,
    required: true,
  },
  images: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
});
//let Product = mongoose.model('products', contactSchema);
//How to get rid of Error: “OverwriteModelError: Cannot overwrite `undefined` model once compiled.”?
var Product = mongoose.models.products || mongoose.model('products', productSchema) 
 

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())
const router = express.Router();
app.use('/.netlify/functions/store-rest-server', router);  // path must route to lambda

router.get('/products', async (req:any, res:any) => {
  const products = await Product.find({});
  console.log(products);
  
  try {
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.post('/products', async (req:any, res:any) => {
  const product = new Product({
		title: req.body.title,
		price: req.body.price,
    rating: req.body.rating,
		shortDescription: req.body.shortDescription,
    description: req.body.description,
    categories: req.body.categories,
		images: req.body.images,
	});

  try {
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/products/:id', async (req:any, res:any) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
});

router.put('/products/:id', async (req:any, res:any)=> {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body)
    await Product.save()
    res.send(product)
  } catch (err) {
    res.status(500).send(err)
  }
});


module.exports = app;
module.exports.handler = serverless(app);
