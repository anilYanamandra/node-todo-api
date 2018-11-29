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
db.collection('Users').insertOne({name,age,location},(err,res) => {

    if(err) {
        return console.log('Unable to save the document into the database', err); 
    }

    console.log(`Inserted user ${name}`)
    console.log(res.ops[0]._id.getTimestamp());

}); 

db.close();
});