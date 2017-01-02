var request = require('request');


/*
==========
 Commands
==========
*/
function processCommand(command, sender) {
    var response = [];

    if (command === 'help')
        response = getHelp();
    else if (command === 'giphy')
        response = getGiphy();
    else if (command === 'corgi')
        response = getCorgi(sender);
    else
        console.log("Command `" + command + "` not found.");

    return response;
}

function getHelp() {
    return [
        "Hi, I am Jeeves. I am here to answer any of your questions or simply talk to you.",
        "Try asking me some questions or saying hi and hopefully I can be helpful!",
        "Implemented keywords: corgi, giphy"
    ];
    // brain.sendMessage(sender, {text: text1});
    // brain.sendMessage(sender, {text: text2});
    // brain.sendMessage(sender, {text: text3});
}

function getGiphy() {
    return [
        'Getting you a giphy!'
    ];
}

function getCorgi(recipientId) {
    var imageUrl = "http://www.cutestpaw.com/wp-content/uploads/2014/08/corgi.jpg";
    message = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Corgi",
                    "subtitle": "Cute corgi picture",
                    "image_url": imageUrl ,
                    "buttons": [{
                        "type": "web_url",
                        "url": imageUrl,
                        "title": "Show corgi"
                        }, {
                        "type": "postback",
                        "title": "I like this",
                        "payload": "User " + recipientId + " likes corgi " + imageUrl,
                    }]
                }]
            }
        }
    };

    return [ message ];
}


/*
===============================
 Sending messages back to user
===============================
*/

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

// send rich message with kitten
function corgiMessage(recipientId, text) {

    text = text || "";
    var values = text.split(' ');

    if (values[0].toLowerCase() === 'corgi') {

        var imageUrl = "http://www.cutestpaw.com/wp-content/uploads/2014/08/corgi.jpg";

        message = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Corgi",
                        "subtitle": "Cute corgi picture",
                        "image_url": imageUrl ,
                        "buttons": [{
                            "type": "web_url",
                            "url": imageUrl,
                            "title": "Show corgi"
                            }, {
                            "type": "postback",
                            "title": "I like this",
                            "payload": "User " + recipientId + " likes corgi " + imageUrl,
                        }]
                    }]
                }
            }
        };

        sendMessage(recipientId, message);
        return true;
    }

    return false;

};

var greetingList = [
    'Hello!',
    'Hey!',
    'Hi!',
    'Howdy!',
    'Hey, how are you?'
];
function getGreeting() {
    var randomNumber = Math.floor(Math.random()*greetingList.length);
    return greetingList[randomNumber];
}

module.exports = {
    sendMessage: sendMessage,
    corgiMessage: corgiMessage,
    processCommand: processCommand,
    getGreeting: getGreeting
};