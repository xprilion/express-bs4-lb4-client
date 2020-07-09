module.exports = {jwt};

function jwt(token) {
    return (typeof(token) !== "undefined" && token !== null && token.length > 32);
}