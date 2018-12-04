const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

var id = '5c064330f83fdcfa27990975';
//var id = '5c066f00426df3bb45b6cd7';

// Todo.find({
//     _id:id
// }).then((todos) => {
//     console.log('Todos',todos);
// })

// Todo.findOne({completed: false}).then((todo)=> 
// {
//     console.log('Got Todo', todo);
// })

// if(!ObjectID.isValid(id)) {
//     console.log('Id not valid');
// } else {
//     Todo.findById(id).then((todo)=> 
//     {
//         console.log('Got Todo', todo);
//     }).catch((err) => {
//         console.log('not found')
//     })
// }

User.findById(id).then((us) => {
    console.log('The user found is ', us); 
});

User.findById( new ObjectID()).then((us) => {
    console.log('The user found is ', us); 
});
