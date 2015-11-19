// var request = require('supertest'),
//     app = require('../../app').app;

// var Todo = require ('../../app/models/todo'),
//     List = require('../../app/models/list');

// describe ('TodoController', function() {

//     describe('with data', function() {
//         var todo;
//         var list;

//         beforeEach(function (done) {
//             List.create({
//                 name: 'testListforTodo2'
//             }, function (error, newList) {
//                 if (error) {
//                     console.log(error);
//                     done.fail(error);
//                 } else {
//                     list = newList;
//                     Todo.create({
//                         _listid: list._id,
//                         name: 'testTodo' 
//                     }, function (err, newTodo) {
//                         if (err) {
//                             console.log(err);
//                             done.fail(err);
//                         } else {
//                             todo = newTodo;
//                             done();
//                         }
//                     });
//                 }
//             })
//         });

//         afterEach(function (done) {
//             Todo.remove({_listid:list._id},function (err, removedTodo) {
//                 if (err) {
//                   done.fail(err);
//                 } else {
//                     List.remove({_id:list._id},function (error, removedList) {
//                         done();  
//                     });        
//                 }
//             })
//         });

//         //Test for creating a new todo item
//         it('should create a new todo', function (done) {
//             var listId = list._id;
//             request(app).post('/api/todos/'+listId)
//             .send({
//                 // _listid: listId,
//                 name: 'testTodoCreate'
//             })
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end(function (err, res){
//                 if (err) {
//                     done.fail(err);
//                 } else {
//                     returnedTodo = res.body;
//                     expect(returnedTodo.name).toBe('testTodoCreate');
//                     Todo.findOne({ name:'testTodoCreate'})
//                     .remove(function (error){
//                         done();
//                     })
//                 }
//             });
//         });

//         //Test for deleting an existing todo item
//         it('should delete an existing todo item', function (done) {
//             request(app).post('/api/todos/delete/'+todo._id)
//             .end(function (err, res){
//                 if (err) {
//                   done.fail(err);
//                 } else {
//                     Todo.findOne({ _id: todo._id})
//                     .remove(function (error){
//                         Todo.findOne({ _id: todo._id}, function (err,todo){
//                             if (err) {
//                                 done.fail(err);
//                             } else {
//                                 expect(todo).toBeNull()
//                                 done();      
//                             }
//                         })
//                     })
//                 }
//             });
//         });

//         //Test for updating a todo item
//         it('should update an existing todo item', function (done){
//             request(app).post('/api/todos/edit/'+todo._id)
//             .send({
//                 name:'updatedNameTodo'
//             })
//             .end(function (err,res){
//                 if (err) {
//                   done.fail(err);
//                 } else {
//                     returnedTodo = res.body[res.body.length-1];
//                     expect(returnedTodo.name).toBe('updatedNameTodo');
//                     Todo.findOne({ name:'updatedNameTodo'})
//                     done();
//                 }
//             })
//         })

//     });
// });