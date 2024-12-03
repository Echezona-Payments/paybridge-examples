const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

const APP_URL = process.env.APP_URL;
const PAYBRIDGE_PUBLIC_KEY = process.env.PAYBRIDGE_PUBLIC_KEY;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "error.html"));
});

app.get("/api/create-payment", async function (req, res) {
  const paymentParams = {
    mode: "Live",
    publicKey: PAYBRIDGE_PUBLIC_KEY,
    amount: "50",
    currency: "NGN",
    email: "john@doe.com",
    phone: "08012345678",
    firstName: "John",
    lastName: "Doe",
    callBackUrl: `${APP_URL}/error`, // replace with your desired callback URL
    transactionId: Math.floor(Math.random() * 99999999) + "",
  };

  try {
    const resp = await axios.post(
      "https://api.echezona.com/api/Payments/Initialize",
      paymentParams,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${PAYBRIDGE_PUBLIC_KEY}`,
        },
      }
    );
    res.json(resp.data);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

module.exports = app;
