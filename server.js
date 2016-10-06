var express = require('express');
var app = express();
var http = require('http').Server(app);

const PORT = 3000;

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});