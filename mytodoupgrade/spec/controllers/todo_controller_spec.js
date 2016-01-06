//necessary modules
var request = require('supertest'),
  bcrypt = require('bcrypt-nodejs'),
  app = require('../../app').app;

//model
var Todo = require ('../../app/models/todo'),
  List = require('../../app/models/list'),
  User = require('../../app/models/user');

//variables
var auth = {};
var user;

beforeAll(function (done) {
  var password = 'testingTodos',
    salt = bcrypt.genSaltSync(10),
    hash = bcrypt.hashSync(password,salt);

  User.create({
    username: 'testingTodos',
    password: hash,
    email: 'testingTodos@test.com'
  }, function (error, dummyUser) {
    if(error) {
      done.fail(error);
    } else {
      user = dummyUser;
      loginUser(auth, done);
    }
  });
});

afterAll(function (done) {
  User.remove({_id: user._id}, function (error, removedUser) {
    if(error) {
      done.fail(error);
    } else {
      done();
    }
  });
});

describe ('TodoController', function() {
  describe('with data', function() {
    var todo;
    var list;

    beforeEach(function (done) {
      List.create({
          name: 'testListforTodo2'
      }, function (error, newList) {
        if (error) {
            done.fail(error);
        } else {
          list = newList;
          Todo.create({
              _listid: list._id,
              name: 'testTodo' 
          }, function (error, newTodo) {
              if (error) {
                done.fail(error);
              } else {
                todo = newTodo;
                done();
              }
          });
        }
      });
    });

    afterEach(function (done) {
      Todo.remove({_listid:list._id},function (error, removedTodo) {
        if (error) {
          done.fail(error);
        } else {
          List.remove({_id:list._id},function (error, removedList) {
            done();  
          });        
        }
      });
    });

    //Test for creating a new todo item
    it('should create a new todo', function (done) {
        var listId = list._id;
        request(app).post('/api/todos/'+listId)
        .send({
          name: 'testTodoCreate'
        })
        .set('X-ACCESS-TOKEN', auth.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (error, res){
          if (error) {
            done.fail(error);
          } else {
            returnedTodo = res.body;
            expect(returnedTodo.name).toBe('testTodoCreate');
            Todo.findOne({ name:'testTodoCreate'})
              .remove(function (error){
                if (error) {
                  done.fail(error);
                } else {
                  done();
                }
              });
          }
        });
    });

    //Test for updating a todo item
    it('should update an existing todo item', function (done){
      request(app)
      .post('/api/todos/edit/'+todo._id)
      .set('X-ACCESS-TOKEN', auth.token)
      .send({
        name:'updatedNameTodo'
      })
      .end(function (error,res){
          if (error) {
            done.fail(error);
          } else {
            returnedTodo = res.body[res.body.length-1];
            expect(returnedTodo.name).toBe('updatedNameTodo');
            Todo.findOne({ name:'updatedNameTodo'})
            done();
          }
      });
    });

    //Test for deleting an existing todo item
    it('should delete an existing todo item', function (done) {
      request(app)
      .post('/api/todos/delete/'+todo._id)
      .set('X-ACCESS-TOKEN', auth.token)
      .end(function (error, res){
        if (error) {
          done.fail(error);
        } else {
          Todo.findOne({ _id: todo._id})
          .remove(function (error){
            Todo.findOne({ _id: todo._id}, function (error,todo){
              if (error) {
                done.fail(error);
              } else {
                expect(todo).toBeNull()
                done();      
              }
            });
          });
        }
      });
    });
  });
});

function loginUser(auth, done) {
  request(app)
  .post('/api/authenticate')
  .send({
    username: 'testingTodos',
    password: 'testingTodos'
  })
  .expect(200)
  .end(onResponse);

  function onResponse(error, res) {
    auth.token = res.body.token;
    done();
  }    
}