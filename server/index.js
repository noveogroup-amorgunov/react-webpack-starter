const request = require('request');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname + '/../client/dist')));

const link = 'https://hh.ru/autosuggest/multiprefix/v2?q={{value}}&d=companies_RU';

app.get('/api', function (req, res) {
    const q = req.param('q');
    const url = link.replace('{{value}}', encodeURIComponent(q));

    request(url, (error, response, body) => {
        res.json(JSON.parse(body).items);
    });
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(3000, () => console.log('app listening on port 3000!'));