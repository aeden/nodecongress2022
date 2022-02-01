"use strict";

require('dotenv').config();

var client = require("dnsimple")({
  baseUrl: 'https://api.sandbox.dnsimple.com',
  accessToken: process.env.TOKEN,
});

const args = process.argv.slice(2);
var domainName = args[0];

// Fetch your account details
client.identity.whoami().then((response) => {
  const accountId = response.data.account.id;

  console.log("Check availability of " + domainName);
  client.registrar.checkDomain(accountId, domainName).then((response) => {
    console.log(response.data);
  });
}, (error) => {
  console.log(error);
});
