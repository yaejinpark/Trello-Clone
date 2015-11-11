// var request = require('request'),
// 	Todo = require('../../app/models/todo'),
// 	TodoController = require("../../app/controllers/todo_controller.js");

// describe('TodoController', function(){

// 	describe('Tests with data', function(){
// 		var todo;

// 		beforeEach(function(done) {
// 			new Todo({
// 				name:'controllerTest',
// 			}).save()
// 			  .then(function(newTodo) {
// 			  	todo = newTodo;
// 			  	done();
// 			  });
// 		});

// 		afterEach(function(done) {
// 			new Todo({
// 				id: todo.id
// 			}).destroy()
// 			  .then(done)
// 			  .catch(function (error) {
// 			  	done.fail(error);
// 			  });
// 		});

// 		it('should return todos', function (done){
// 			request('http://localhost:3000/todos', function (error,response,body){
// 				expect(response.statusCode).toBe(200);
// 				done();
// 			});
// 		})
// 	})
// })