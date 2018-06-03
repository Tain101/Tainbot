const {req}		= require('utils.js');

const log			= req('utils.js')('routing.js');

const request	= req('request');
const express	= req('express');
const app			= express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.send('online :)');
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

