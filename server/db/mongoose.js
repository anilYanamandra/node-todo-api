var mongoose = require('mongoose');

var mongodburi = Process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.Promise = global.Promise;
mongoose.connect(mongodburi);

module.exports = {mongoose};
