"use strict";

require('dotenv').config();

var client = require("dnsimple")({
  baseUrl: 'https://api.sandbox.dnsimple.com',
  accessToken: process.env.TOKEN,
});

const args = process.argv.slice(2);
var domainName = args[0];
var registrantId = args[1];

// Fetch your account details
client.identity.whoami().then((response) => {
  const accountId = response.data.account.id;

  console.log("Check availability of " + domainName);
  client.registrar.checkDomain(accountId, domainName).then((response) => {
    if (response.data.available) {
      console.log("Domain " + domainName + " is available");
      client.registrar.registerDomain(accountId, domainName, {registrant_id: registrantId}).then((response) => {
        client.zones.createZoneRecord(accountId, domainName, {name: "", type: "ALIAS", content: "proxy-ssl.webflow.com"});
        client.domains.createEmailForward(accountId, domainName, {alias_name: "anthony", destination_email: "anthony.eden@dnsimple.com"});
        client.zones.listZoneRecords(accountId, domainName).then((response) => {
          console.log(response);
        });
      });
    } else {
      console.log("Domain " + domainName + " is not available");
    }
  });
}, (error) => {
  console.log(error);
});
