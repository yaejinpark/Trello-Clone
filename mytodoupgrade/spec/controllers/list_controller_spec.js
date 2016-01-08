//necessary modules
var request = require('supertest'),
  bcrypt = require('bcrypt-nodejs'),
  app = require('../../app').app;

//models
var	List = require('../../app/models/list'),
	Todo = require ('../../app/models/todo'),
  User = require ('../../app/models/user'),
	Board = require('../../app/models/board');

//variables
var auth = {};
var list;
var todo;
var board;

beforeAll(function (done) {
  var password = 'hiFren',
  salt = bcrypt.genSaltSync(10),
  hash = bcrypt.hashSync(password,salt);

  User.create({
    username: 'imapotato',
    password: hash,
    email: 'imapotato@test.com'
  }, function (error, dummyUser) {
    if(error) {
      done.fail(error);
    } else {
      user = dummyUser;
      //after user is created, call function that allows auth.
      loginUser(auth, done);
    }
  });
});

afterAll(function (done) {
  User.remove({_id: user._id}, function (error, removedUser) {
    if (error) {
      done.fail(error);
    } else {
      done();
    }
  });
});

describe ('ListController', function() {
 describe('with data', function() {
		beforeEach(function (done){
      /*Board is created so that list is associated with a board.
      This is necessary due to the actual code using 'populate'*/
			Board.create({
				name: 'testBoardForList'
			}, function (error, newBoard){
				if(error){
					done.fail(error);
				} else {
					board = newBoard;
					List.create({
						_boardid: board._id,
						name: 'testList'
					}, function (error, newList){
						if (error) {
							done.fail(error);
						} else {
							list = newList;
							Todo.create({
								_listid: list._id,
								name: 'testTodoForList'
							}, function (error, newTodo){
								if (error) {
									done.fail(error);
								} else {
									todo = newTodo;
									done();
								}
							});
						}
					});
				}
			});
		});

		afterEach(function (done){
			Todo.remove({_listid:list._id}, function (error, removedTodo) {
				if (error) {
					done.fail(error);
				} else {
					List.remove({_boardid:board._id}, function (error, removedList) {
						if (error) {
							done.fail(error);
						} else {
							Board.remove({_id:board._id}, function (error, removedBoard) {
								done();
							});
						}
					});
				}
			});
		});

		//Test for showing a list
		it('should show an existing list', function (done) {
			request(app)
      .get('/api/list/'+list._id)
      .set('X-ACCESS-TOKEN', auth.token)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (error, res){
				if (error) {
					done.fail(error);
				} else {
					expect(res.body.length).toEqual(1);
					returnedList = res.body[0];
					expect(returnedList.name).toBe('testList');
					done();
				}
			});
		});

		//Test for creating a new list
		it('should create a new list', function (done) {
			var boardId = board._id;

			request(app)
      .post('/api/lists/create/'+boardId)
			.send({
				name: 'testListCreate'
			})
      .set('X-ACCESS-TOKEN', auth.token)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (error,res){
				if (error) {
					done.fail(error);
				} else {
					returnedList = res.body;
					expect(returnedList.name).toBe('testListCreate');
					List.findOne({ name:'testListCreate'})
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

		//Test for updating an existing list
		it('should update an existing list', function (done) {
			request(app)
      .post('/api/lists/edit/'+list._id)
      .set('X-ACCESS-TOKEN', auth.token)
			.send({
				name:'updatedNameList'
			})
			.end(function (error,res){
				if (error) {
					done.fail(error);
				} else {
					returnedList = res.body[res.body.length-1];
					expect(returnedList.name).toBe('updatedNameList');
					Todo.findOne({name: 'updatedNameList'})
					done();
				}
			});
		});

   //Test for deleting an existing list
   it('should delete an existing list', function (done) {
     request(app)
     .post('/api/lists/delete/'+list._id)
     .set('X-ACCESS-TOKEN', auth.token)
     .end(function (error, res){
        if (error) {
         done.fail(error);
        } else {
         List.findOne({ _id: list._id})
         .remove(function (error){
           List.findOne({ _id: list._id}, function (error,list){
             if (error) {
                done.fail(error);
             } else {
               expect(list).toBeNull()
               done();      
             }
           });
         });
        }
      });
    });
	});
});

//This function allows existing user to login
function loginUser(auth, done) {
  request(app)
  .post('/api/authenticate')
  .send({
    username: 'imapotato',
    password: 'hiFren'
  })
  .expect(200)
  .end(onResponse);

  function onResponse(error, res) {
    auth.token = res.body.token;
    done();
  }    
}