'use strict';

const redisOptions = {
	host: '127.0.0.1',
	port:'6379'
};

const redis = require('redis');
const redisClient = redis.createClient(redisOptions);

const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const appPort = process.env.PORT || 3000;
const api = require('./api');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', api);

app.use(function(req, res) {
    res.status(404).send('That\'s a 404.');
});

server.listen(appPort, () => {
    console.log(`listening on`, appPort);
});




redisClient.on('error', function (err) {
	console.log('Error ' + err);
});

redisClient.on('connect', function (err) {
	console.log('Redis Client is Connected');
});

redisClient.on('ready', function (err) {
	console.log('Redis Client is Ready');
});

// client.set("string key", "string val", redis.print);

