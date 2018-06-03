const express = require('express');
const app     = express();
const request = require('request');

const utils = require(__dirname  + '/utils.js');
const log   = require('debug')('routing.js');
const error = require('debug')('routing.js:error');
error.log   = console.error.bind(console);


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.on("error", (error) => {
  error("routing.js:\n" + error);
  // utils.writeFile( __dirname + `/.data/logs/${Date.now()}Routing.txt`, error);
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  // utils.writeFile(__dirname + `/.data/logs/${Date.now()}Routing.txt`, 'Your app is listening on port ');
  // logger.info('Your app is listening on port ' + listener.address().port);
  log('Your app is listening on port ' + listener.address().port);
});

