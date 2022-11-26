const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

// Connecting to Mongoo Atlas database
mongoose.connect(
  "mongodb+srv://ander_frago:4Vientos@cluster0.wdu3m.mongodb.net/productsdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();

let contactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
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
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  images: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});
let Product = mongoose.model("products", contactSchema);

app.use(function (req: any, res: any, next: any) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://ng-mystore-client.web.app"
  ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.get("/products", async (req: any, res: any) => {
  const products = await Product.find({});
  console.log(products);

  try {
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/products", async (req: any, res: any) => {
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

app.delete("/products/:id", async (req: any, res: any) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) res.status(404).send("No item found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/products/:id", async (req: any, res: any) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    await Product.save();
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*
// This is not working with Heroku, IP and PORT are automatically asigned
const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address();
  console.log('Listening on %s %s', address, port);
});
*/

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
