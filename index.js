require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const validUrl = require('valid-url');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let urlDatabase = {};
let urlCounter = 1;

// Route pour raccourcir une URL
app.post('/api/shorturl', (req, res) => {
  const original_url = req.body.url;

  // Valider l'URL
  if (!validUrl.isUri(original_url)) {
    return res.json({ error: 'invalid url' });
  }

  // Stocker l'URL dans la base de données simulée
  const short_url = urlCounter++;
  urlDatabase[short_url] = original_url;

  res.json({ original_url, short_url });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
