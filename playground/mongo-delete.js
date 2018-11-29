//var MongoClient = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');


var obj = new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=> {

if(err) {
    return console.log('DB Connect is Unscessful');
    
}
console.log('Connected to Mongo DB Successful');

//delete many 

// db.collection('Todos').deleteMany({text: 'go home'}).then( (result) => {
//     console.log(result);
// })

//delete one 

// db.collection('Todos').deleteOne({text: 'go home'}).then( (result) => {
//     console.log(result);
// })

//find one and Delete

// db.collection('Todos').findOneAndDelete({text: 'go home'}).then((result) => {
//     console.log(result);
// })

//Users Delete 

// db.collection('Users').deleteMany({name: 'Anil'}).then( (result) => {
//     console.log(result);
// })

db.collection('Users').findOneAndDelete({_id: new ObjectID('5bffc2f104a388b72bc45ed3')}).then((result) => {
    console.log(result);
})



//db.close();
});