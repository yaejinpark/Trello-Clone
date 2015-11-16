(function() {
  'use strict';

    describe('TodoService', function() {
        var service;

        // Configure module that contains the controller being tested
        beforeEach(module('mytodo'));

        beforeEach(inject(function (_TodoService_) {
            service = _TodoService_;
        }));

        //Test for getTodos()
        it('should show all todos with the same listId', function (done) {
            // var listId = 564520305755750406d486f0;
            service.getTodos('564520305755750406d486f0')
            .then(function (data){
                console.log('I made it');
                console.log(data);
                expect(data.length).toBeGreaterThan(0);
                done();
            })
            .catch(function (err) {
                console.log('Error: ' + err);
                done.fail(err);
            });

            // console.log(service.getTodos('564520305755750406d486f0').$$state);
            // expect(service.getTodos('564520305755750406d486f0')).toBe();

        });

        // it('should set current todo to 1', function() {
        //   expect(service.setTodo(1)).toEqual(1);
        //   expect(service.getTodo()).toEqual(1);
        // });
    });
})();