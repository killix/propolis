var express = require('express')
var p = require('path')
var regions = require('./data/regions');
var trails = require('./data/trails');

var app = express();

app.get('/', (req, res) => res.sendFile(p.resolve('index.html')));
app.get('/trail/*', (req, res) => res.sendFile(p.resolve('index.html')));
app.get('/region/*', (req, res) => res.sendFile(p.resolve('index.html')));

app.get('/api/v0/trails', (req, res) => res.send(trails));
app.get('/api/v0/regions', (req, res) => res.send(regions));

app.use('/static', express.static('dev'));

app.listen(8080, () => {
    console.log('Server listening at: http://localhost:8080');
});
