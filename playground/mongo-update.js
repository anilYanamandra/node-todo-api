//var MongoClient = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');


var obj = new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=> {

if(err) {
    return console.log('DB Connect is Unscessful');
    
}
console.log('Connected to Mongo DB Successful');



//find one and Delete

// db.collection('Todos')
// .findOneAndUpdate(
//     {_id: new ObjectID('5bffbd6804a388b72bc45cae')}, 
//     {$set: {
//         completed: true
//     }},{
//         returnOriginal: false
//     }
// ).then((result) => {
//     console.log(result);
// })



db.collection('Users')
.findOneAndUpdate({_id: new ObjectID('5bffcfc32ab71d11249d05b3')}, 
    {$set: {name: 'Ramya'},
    $inc: {
        age: -3
    }}, {returnOriginal:false}).then((result) => {
        console.log(result);
    })

//db.close();
});