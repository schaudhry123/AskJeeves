function isKeyword(message) {
    if (lowered === 'giphy') {
        return 'giphy';
    }
    return null;
}

function isGreeting(message) {
    lowered = message.toLowerCase();
    return (
            (lowered.indexOf('hey') === 0) || (lowered.indexOf('hi') === 0) ||
            (lowered.indexOf('howdy') === 0) || (lowered.indexOf('hello') === 0)
            );
}

function isHelpRequest(message) {
    lowered = message.toLowerCase();
    return (lowered === '!help');
}

function isQuestion(message) {
    lowered = message.toLowerCase();
    return (
            (lowered.indexOf('?') > -1) || (lowered.indexOf('what') > -1) ||
            (lowered.indexOf('how') > -1) || (lowered.indexOf('who') > -1) ||
            (lowered.indexOf('who') > -1)
            );
}

module.exports = {
    isKeyword: isKeyword,
    isGreeting: isGreeting,
    isQuestion: isQuestion
};
