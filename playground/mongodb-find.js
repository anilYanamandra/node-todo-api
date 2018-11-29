//var MongoClient = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');


var obj = new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=> {

if(err) {
    return console.log('DB Connect is Unscessful');
    
}
console.log('Connected to Mongo DB Successful');

// db.collection('Todos').insertOne({text:'Complete node section 7'

// },(err, res) => {
//     if(err) {
//         return console.log('Unable to insert',err);
//     }

//     console.log(JSON.stringify(res.ops,undefined,2));
// });

var name = 'Anil';
var age = '30';
var location = 'Bangalore';
db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs,undefined,2));

},(err) => {
    console.log(err);
});

db.collection('Todos').find({_id: new ObjectID('5bffadc59d920f0d195f4408')}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs,undefined,2));

},(err) => {
    console.log(err);
});

db.collection('Todos').find().count().then((count) => {
    console.log('Todos');
    console.log(count);

},(err) => {
    console.log(err);
});
db.collection('Users').find({name: 'Anil'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs,undefined,2));

},(err) => {
    console.log(err);
});

//db.close();
});