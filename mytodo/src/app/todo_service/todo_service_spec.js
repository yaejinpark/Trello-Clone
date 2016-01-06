(function() {
  'use strict';

  describe('TodoService', function() {
    var service, $httpBackend, handler, todoData, errorMessage, $log;

    // Configure module that contains the controller being tested
    beforeEach(module('mytodo'));

    beforeEach(inject(function (_$log_, _$httpBackend_, _TodoService_) {
      $log = _$log_;
      $httpBackend = _$httpBackend_;
      service = _TodoService_;
      todoData = [];

      // Define an object with functions to handle success and error for our API calls
      // These functions simulate the functions written in controllers when a service is called
      handler = {
        success: function(todo) {
          todoData.push(todo);
        },
        error: function(err) {
          errorMessage = err;
        }
      };

      // Use the Jasmine spyOn method to setup a callback using our handler mock object
      spyOn(handler, 'success').and.callThrough();
      spyOn(handler, 'error').and.callThrough();
    }));

    //Test route for getTodos()
    fit('should show all todos with the same listId', function () {
      var listId = '56561942d89a0664090dd6c4';
      var response = service.getTodos(listId)
        .then(function (){
          $log.info('Success!');
        })
        .catch(function (err) {
          $log.error('Error: ' + err);
        });

      expect(response).toBeTruthy();
    });

    //Test route for createTodo()
    it('should create a new todo item', function () {
      var createTodos = service.createTodo()
        .then(function () {
          $log.info('Success!');
        })
        .catch(function (err) {
          $log.error('Error: ' + err);
        });

      expect(createTodos).toBeTruthy();
    });

    //Test route for updateTodo()
    it('should update an existing todo item', function () {
      var id = '56561948d89a0664090dd6c5'
      var existingTodo = {
        _id: id,
        name: 'pre-update todo'
      };

      var updatedTodo = {
        _id: id,
        name: 'i updatez'
      };

      /*Use the httpBackend mock service to capture the call to our API 
      and return the data we specify in the response variable*/
      $httpBackend.whenPOST(/edit\/(\S+)$/)
        .respond(function (method, url) {
          //Retrieve the requested id as integer
          var re = /.*\/edit\/(\S+)$/;
          var todoId = url.replace(re, '$1');

          if (todoId === existingTodo._id) {
            return [200, updatedTodo];
          } else {
            return [404, { message: 'Not Found'}];
          }
        });
      // setup the service to use the success and error handler functions we defined in the beforeEach block.
      service.updateTodo(id).then(handler.success, handler.error);
      //execute the HTTP API call
      $httpBackend.flush();

      //test the results
      expect(todoData[0]._id).toEqual(updatedTodo._id);
      expect(handler.error).not.toHaveBeenCalled();
      expect(errorMessage).toBeUndefined();
    });

    //Test route for deleteTodo()
    it('should delete an existing todo item', function () {
      var id = '56561948d89a0664090dd6c5'
      var existingTodo = {
        _id: id,
        name: 'existing todo'
      };

      $httpBackend.whenPOST(/delete\/(\S+)$/)
        .respond(function (method, url) {
          //Retrieve the requested id as integer
          var re = /.*\/delete\/(\S+)$/;
          var todoId = url.replace(re, '$1');

          if (todoId === existingTodo._id) {
            return [200, existingTodo];
          } else {
            return [404, { message: 'Not Found'}];
          }
        });
      service.deleteTodo(id).then(handler.success, handler.error);
      $httpBackend.flush();

      //test the results
      expect(todoData[0]._id).toEqual(existingTodo._id);
      expect(handler.error).not.toHaveBeenCalled();
      expect(errorMessage).toBeUndefined();
    });
  });
})();