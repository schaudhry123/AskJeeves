var request = require('request');

function getGiphy() {

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

// send rich message with kitten
function kittenMessage(recipientId, text) {

    text = text || "";
    var values = text.split(' ');

    if (values[0] === 'corgi') {

        var imageUrl = "http://www.cutestpaw.com/wp-content/uploads/2014/08/corgi.jpg";

        message = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Kitten",
                        "subtitle": "Cute kitten picture",
                        "image_url": imageUrl ,
                        "buttons": [{
                            "type": "web_url",
                            "url": imageUrl,
                            "title": "Show kitten"
                            }, {
                            "type": "postback",
                            "title": "I like this",
                            "payload": "User " + recipientId + " likes kitten " + imageUrl,
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



module.exports = {
    sendMessage: sendMessage,
    kittenMessage: kittenMessage
};