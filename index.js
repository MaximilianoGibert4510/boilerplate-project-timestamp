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
  const value = req.params.date;
 
  if (!value) {
    const now = new Date();
    return res.send({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }
  // Verificar si es un timestamp Unix (número largo)
  const unixTimestamp = !isNaN(Number(value)) && value.length === 13; // Unix timestamp tiene 13 dígitos
  const utcDate = !isNaN(Date.parse(value)); // Verificar si es una fecha UTC válida


  if (unixTimestamp) {
    // Si es un timestamp Unix válido
    const unix = Number(value);
    const utc = new Date(unix).toUTCString();
    res.send({ 'unix': unix, 'utc': utc });
  } else if (utcDate) {
    // Si es una fecha UTC válida
    const unix = new Date(value).getTime();
    const utc = new Date(value).toUTCString();
    res.send({ 'unix': unix, 'utc': utc });
  } else {
    // Si no es válido, devolver error
    res.send({ error: "Invalid Date" });
  }
});





// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
