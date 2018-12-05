const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb'); 

const {Todo} = require('../server/models/todo');
const {app} = require('../server/server');
const id = new ObjectID(); 

const todos = [{text: 'Sample Todo1'}, {text: 'SampleTodo2'}, {text: 'SampleTodo2', _id: id}];


beforeEach((done) => {
    Todo.remove({}).then(() => { 
        return Todo.insertMany(todos)    
   }).then(() => done());
})
describe('POST /todos', () => {

it('should create a new todo', (done) => {
    var text = 'Sample Todo Text';
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
        expect(res.body.text).toBe(text);
    }).end((err,res) => {
        if(err) {
            return done(err);
        }

        Todo.find({text}).then((todos) => {
           
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
        }).catch((e) => done(e));
    });

});


it('SHould not create a todo without valid data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res) => {
        if(err) {
            return done(err);
        }


        Todo.find().then((todos) => {
            expect(todos.length).toBe(3);
        }).catch((e)=> {done(e)});
        done();
    });
})


});


describe('Get /Todos' , ()=> {
    it('Should Get All Todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(3);
        }).end(done);
    })
}); 



describe('Get /todos/:id ', (done) => {
    it('Should get one Todo based on id ',(done) => {
        var url = '/todos/'+id; 
        //console.log(url);
        request(app)
        .get(url)
        .expect(200)
        .end(done);
    }); 

    it('Should throw 404 if Object id is not found', () => {
        var url = '/todos/'+ new ObjectID().toHexString(); 
        //console.log(url);
        request(app)
        .get(url)
        .expect(404)
        .end(done);

    }) ; 


    if('Should Throw 400 if Invalid Object is passed ', () => {

        var url = '/todos/123'; 

        request(app)
        .get(url)
        .expect(400)
        .end(done);
    }); 
})