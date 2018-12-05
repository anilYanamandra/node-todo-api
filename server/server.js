var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

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


app.get('/todos', (req,res) =>{
    Todo.find().then((todos) => {
        var status = "Success";
        res.send({status,todos});
    }, (e) => { res.status(500).send({error: 'Unable to fetch data'})})

});


app.get('/todos/:id', (req,res) => {
    //res.send(req.params.id);
  var id = req.params.id;
  if(ObjectID.isValid(id)) {
    Todo.findById(id).then((todo) => {
    if(todo) {
      var status = 'success' ;
      res.send({status,todo});
     } else {
      var status = 'fail';
      var message = 'Could not find the Todo'
      res.status(404).send({status,message});
  
     }
    })
  } else {
    var status = 'fail';
    var message = 'Please provide a valid id'
    res.status(400).send({status,message});
  }
    
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};