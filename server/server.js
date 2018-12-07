require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');

const { ObjectID } = require('mongodb');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    var status = "Success";
    res.send({ status, todos });
  }, (e) => { res.status(500).send({ error: 'Unable to fetch data' }) })

});


app.get('/todos/:id', (req, res) => {
  //res.send(req.params.id);
  var id = req.params.id;
  if (ObjectID.isValid(id)) {
    Todo.findById(id).then((todo) => {
      if (todo) {
        var status = 'success';
        res.send({ status, todo });
      } else {
        var status = 'fail';
        var message = 'Could not find the Todo'
        res.status(404).send({ status, message });

      }
    })
  } else {
    var status = 'fail';
    var message = 'Please provide a valid id'
    res.status(400).send({ status, message });
  }

});


app.delete('/todos/:id', (req, res) => {
  //res.send(req.params.id);
  var id = req.params.id;
  if (ObjectID.isValid(id)) {
    Todo.findByIdAndRemove(id).then((todo) => {
      if (todo) {

        var status = 'success';
        res.send({ status, todo });
      } else {
        var status = 'fail';
        var message = 'Could not find the Todo'
        res.status(404).send({ status, message });

      }
    })
  } else {
    var status = 'fail';
    var message = 'Please provide a valid id'
    res.status(400).send({ status, message });
  }

});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);;

  if (ObjectID.isValid(id)) {

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, { new: true }).then((todo) => {
      if (todo) {

        var status = 'success';
        res.send({ status, todo });

      } else {
        var status = 'fail';
        var message = 'Could not find the Todo to update'
        res.status(404).send({ status, message });

      }
    }).catch((e) => {
      res.status(400).send();
    });
  } else {
    var status = 'fail';
    var message = 'Please provide a valid id'
    res.status(400).send({ status, message });
  }

})



app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  var user = new User(body);
  user.save().then((user)=> {
    var status = 'Success';
    res.send({status,user});
  },(err)=> {
    console.log(err);
    var status = 'Failure';
    var message = 'Unable to create user '
    if(err.errmsg.indexOf('E11000') >-1) {
      message = 'Email Already Taken.'
    }
    res.status(400).send({status,message});
  })
});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

module.exports = { app };