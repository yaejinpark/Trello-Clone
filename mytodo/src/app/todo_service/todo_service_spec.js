(function() {
  'use strict';

  describe('TodoService', function() {
    var service, $httpBackend, handler, todoData, errorMessage;

    // Configure module that contains the controller being tested
    beforeEach(module('mytodo'));

    beforeEach(inject(function (_$httpBackend_, _TodoService_) {
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
    it('should show all todos with the same listId', function () {
      var listId = '56561942d89a0664090dd6c4';
      var response = service.getTodos(listId)
        .then(function (){
          console.log('I made it');
        })
        .catch(function (err) {
          console.log('Error: ' + err);
        });
      expect(response).toBeTruthy();
    });
  });
})();