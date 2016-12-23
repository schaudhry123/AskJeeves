var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var parser = require('./language_parser.js');
var brain = require('./brain.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/', function (req, res) {
    res.send('This is the AskJeeves Server.');
});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

// Handler receiving messages
app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            message = event.message.text;

            if (parser.isGreeting(message)) {
                sendMessage(event.sender.id, {text: 'Hey! How are you?'});
            }
            else if (parser.isKeyword(message)) {

            }
            else {
                // sendMessage(event.sender.id, {text: message});
                if (!brain.kittenMessage(event.sender.id, event.message.text)) {
                    sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
                }
            }
        }
    }
    res.sendStatus(200);
});