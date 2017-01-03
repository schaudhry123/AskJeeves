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
        var sender = event.sender.id;
        if (event.message && event.message.text) {
            message = event.message.text;

            if (parser.isCommand(message)) {
                var command = message.slice(1);
                var response = brain.processCommand(command, sender);
                for (i = 0; i < response.length; i++) {
                    var message = response[i];
                    if (message.hasOwnProperty('attachment'))
                        brain.sendMessage(sender, message);
                    else
                        brain.sendMessage(sender, {text: message});
                }
            }
            else if (parser.isGreeting(message)) {
                brain.sendMessage(sender, {text: brain.getGreeting()});
            }
            else if (parser.isQuestion(message)) {
                brain.sendMessage(sender, {text: 'You asked me a question!'});
            }
            // else if (parser.isHelpRequest(message)) {
            //     var text1 = "Hi, I am Jeeves. I am here to answer any of your questions or simply talk to you."
            //     var text2 = "Try asking me some questions or saying hi and hopefully I can be helpful!"
            //     var text3 = "Implemented keywords: corgi, giphy"
            //     brain.sendMessage(sender, {text: text1});
            //     brain.sendMessage(sender, {text: text2});
            //     brain.sendMessage(sender, {text: text3});
            // }
            else {
                // sendMessage(sender, {text: message});
                brain.sendMessage(sender, {text: "Echo: " + event.message.text});
            }
        }
    }
    res.sendStatus(200);
});