var mongoose = require('mongoose');

var mongodburi = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(mongodburi);

module.exports = {mongoose};
