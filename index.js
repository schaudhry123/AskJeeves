var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

var $ = require('jquery');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/', function (req, res) {
    res.send('This is TestBot Server');
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
            if (isGreeting(event.message.text)) {
                sendMessage(event.sender.id, {text: 'Hey! How are you?'});
            }
            else {
                sendMessage(event.sender.id, {text: event.message.text});
            }
        }
    }
    res.sendStatus(200);
});

function isGreeting(message) {
    lowered = message.toLowerCase();
    return (
            (lowered.indexOf('hey') === 0) || (lowered.indexOf('hi') === 0) ||
            (lowered.indexOf('howdy') === 0) || (lowered.indexOf('hello') === 0)
            );
}

// Generic function to send messages
function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};