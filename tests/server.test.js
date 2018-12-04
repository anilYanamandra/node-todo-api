const expect = require('expect');
const request = require('supertest');


const {Todo} = require('../server/models/todo');
const {app} = require('../server/server');

const todos = [{text: 'Sample Todo1'}, {text: 'SampleTodo2'}, {text: 'SampleTodo2'}];


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