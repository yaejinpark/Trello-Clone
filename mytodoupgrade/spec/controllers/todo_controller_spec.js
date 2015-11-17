var request = require('supertest'),
    app = require('../../app').app;

var Todo = require ('../../app/models/todo');

describe ('TodoController', function() {

    describe('with data', function() {
        var todo;

        beforeEach(function(done) {
            Todo.create({ 
                name: 'testTodo' 
            }, function (err, newTodo) {
                if (err) {
                    console.log(err);
                    done.fail(err);
                } else {
                    todo = newTodo;
                    done();
                }
            });
        });

        afterEach(function (done) {
            todo.remove(function (err, removedTodo) {
                if (err) {
                  done.fail(err);
                } else {
                  done();
                }
            });
        });

        //Test for creating a new todo item
        // it('should create a new todo', function (done) {
        //     request(app).post('/api/todos/:'+list_id)
        //     .send({
        //         name: 'testTodoCreate'
        //     })
        //     .expect('Content-Type', /json/)
        //     .expect(200)
        //     .end(function (err, res){
        //         if (err) {
        //           done.fail(err);
        //         } else {
        //             returnedTodo = res.body[res.body.length-1];
        //             expect(returnedTodo.name).toBe('testTodoCreate');
        //             Todo.findOne({ name:'testTodoCreate'})
        //             .remove(function (error){
        //                 done();
        //             })
        //         }
        //     });
        // });

        //Test for deleting a new user
        // it('should delete an existing user', function (done) {
        //     request(app).post('/api/users/delete/'+user._id)
        //     .end(function (err, res){
        //         if (err) {
        //           done.fail(err);
        //         } else {
        //             User.findOne({ _id: user._id})
        //             .remove(function (error){
        //                 User.findOne({ _id: user._id}, function (err,user){
        //                     if (err) {
        //                         done.fail(err);
        //                     } else {
        //                         expect(user).toBeNull()
        //                         done();      
        //                     }
        //                 })
        //             })
        //         }
        //     });
        // });

        //Test for updating a user
        // it('should update an existing user', function (done){
        //     request(app).post('/api/users/edit/'+user._id)
        //     .send({
        //         password:'updatedPw',
        //         email:'update@test.com'
        //     })
        //     .end(function (err,res){
        //         if (err) {
        //           done.fail(err);
        //         } else {
        //             returnedUser = res.body[res.body.length-1];
        //             expect(returnedUser.password).toBe('updatedPw');
        //             User.findOne({ email:'update@test.com'})
        //             done();
        //         }
        //     })
        // })

    });
});