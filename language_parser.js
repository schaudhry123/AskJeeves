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

module.exports = {
    isKeyword: isKeyword,
    isGreeting: isGreeting
};
