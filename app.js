const express = require('express');
const https = require('https')
const app = express()
const fs = require('fs');
const path = require('path');
const router = express.Router();

app.get('/', (req, res) => {
  //let content = fs.readFileSync('index.html');
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/content/js/index.js', (req, res) => res.sendFile(path.join(__dirname+'/content/js/index.js')));

app.use('/', router);
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(4433, () => {
    console.log('Listening...')
  });
