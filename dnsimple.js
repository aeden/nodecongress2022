"use strict";

require('dotenv').config();

var client = require("dnsimple")({
  baseUrl: 'https://api.sandbox.dnsimple.com',
  accessToken: process.env.TOKEN,
});

// Fetch your account details
client.identity.whoami().then((response) => {
  console.log(response.data);
}, (error) => {
  console.log(error);
});
