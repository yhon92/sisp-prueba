var express = require('express');
var app = express();
var http = require('http').Server(app);

const PORT = 8888;

app.use(express.static(__dirname + '/public'));

app.get('*', (req, res, next) => {
  if (req.accepts('html')) {
    res.sendFile(__dirname + '/public/index.html');
  } else {
    next();
  }
});

http.listen(PORT, () => {
  console.log(`Servidor corriendo en localhost:${PORT}`);
});