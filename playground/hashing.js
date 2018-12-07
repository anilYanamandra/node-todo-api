const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
var message = 'I am User3';
var hash = SHA256(message).toString();
console.log(`hash for ${message} is ${hash}`)

var data = {
    id: 10
}

var token = jwt.sign(data, '123abc');
console.log(token);

