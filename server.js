const express = require("express");
const app = express();
require('dotenv').config()
var cors = require('cors')
app.use(cors())
var bodyParser = require('body-parser')


// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
  console.log(req.body) // populated!
  next()
})

const testPKey = process.env.TESTP
const testSKey = process.env.TESTS

const livePKey = process.env.LIVEP
const liveSKey = process.env.LIVES

// This is your real test secret API key.
const stripe = require("stripe")(testSKey);
// LIVE KEY PUB
// const stripe = require("stripe")(livePKey);
// // LIVE KEY SECRET
// const stripe = require("stripe")(liveSKey);

app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  //TODO REplace with oracle price of ETH
  const num = Math.floor(Math.random() * 400000)
  return num;
};

app.post("/create-payment-intent", async (req, res) => {

  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    statement_descriptor: "ETH 4 Cash Exchange",
    statement_descriptor_suffix: 'ETH4Cash',
  });
  console.log(items, paymentIntent.items, paymentIntent.amount)

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
