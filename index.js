// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  
  let date;
  
  // Si no se pasa un parámetro de fecha, se usa la fecha actual
  if (!dateParam) {
    date = new Date();
  } else {
    // Intenta parsear la fecha, primero como Unix (número) y luego como UTC
    if (!isNaN(dateParam)) {
      date = new Date(Number(dateParam)); // Unix timestamp
    } else {
      date = new Date(dateParam); // Intentar como fecha UTC
    }
  }
  
  // Si la fecha es válida, devuelve los resultados en formato Unix y UTC
  if (date.getTime()) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});






// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
