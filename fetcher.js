const request = require('request');
const fs = require('fs');
let args = process.argv;

const requestSite = request(url, (error, response, body) => {
  return body;
})

const fetcher = function(url, filePath) {
  let siteData = requestSite(url (error, response, body));
}