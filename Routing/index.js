const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('routing.js');

const request	= req('request');
const express	= req('express');
const app			= express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.on("error", (error) => {
  // error("routing.js:\n" + error);
  // utils.writeFile( __dirname + `/.data/logs/${Date.now()}Routing.txt`, error);
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  // utils.writeFile(__dirname + `/.data/logs/${Date.now()}Routing.txt`, 'Your app is listening on port ');
  // logger.info('Your app is listening on port ' + listener.address().port);
  log('Your app is listening on port ' + listener.address().port);
});



// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  
});
