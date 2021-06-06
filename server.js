const express = require("express");
const app = express();
require('dotenv').config()

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
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
