var request = require('supertest'),
    app = require('../../app').app;

var	List = require('../../app/models/list'),
	Todo = require ('../../app/models/todo'),
	Board = require('../../app/models/board');

describe ('ListController', function() {

	describe('with data', function() {
		var list;
		var todo;
		var board;

		beforeEach(function (done){
			Board.create({
				name: 'testBoardForList'
			}, function (error, newBoard){
				if(error){
					console.log(error);
					done.fail(error);
				} else {
					board = newBoard;
					List.create({
						_boardid: board._id,
						name: 'testList'
					}, function (err, newList){
						if (err) {
							console.log(err);
							done.fail(err);
						} else {
							list = newList;
							Todo.create({
								_listid: list._id,
								name: 'testTodoForList'
							}, function (e, newTodo){
								if (e) {
									console.log(e);
									done.fail(e);
								} else {
									todo = newTodo;
									done();
								}
							})
						}
					})
				}
			})
		});

		afterEach(function (done){
			Todo.remove({_listid:list._id}, function (e, removedTodo) {
				if (e) {
					done.fail(e);
				} else {
					List.remove({_boardid:board._id}, function (err, removedList) {
						if (err) {
							done.fail(err);
						} else {
							Board.remove({_id:board._id}, function (error, removedBoard) {
								done();
							});
						}
					})
					
				}
			})
		});

		//Test for showing a list
		it('should show an existing list', function (done) {
			request(app).get('/api/list/'+list._id)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res){
				if (err) {
					done.fail(err);
				} else {
					expect(res.body.length).toEqual(1);
					returnedList = res.body[0];
					expect(returnedList.name).toBe('testList');
					done();
				}
			})
		})

		//Test for creating a new list
		it('should create a new list', function (done) {
			var boardId = board._id;
			request(app).post('/api/lists/create/'+boardId)
			.send({
				name: 'testListCreate'
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err,res){
				if (err) {
					done.fail(err);
				} else {
					returnedList = res.body;
					expect(returnedList.name).toBe('testListCreate');
					List.findOne({ name:'testListCreate'})
					.remove(function (error){
						done();
					})
				}
			})
		})

		//Test for deleting an existing list
		it('should delete an existing list', function (done) {
			request(app).post('/api/lists/delete/'+list._id)
			.end(function (err, res){
			    if (err) {
			      done.fail(err);
			    } else {
			        List.findOne({ _id: list._id})
			        .remove(function (error){
			            List.findOne({ _id: list._id}, function (err,list){
			                if (err) {
			                    done.fail(err);
			                } else {
			                    expect(list).toBeNull()
			                    done();      
			                }
			            })
			        })
			    }
			})
		})

		//Test for updating an existing list
		it('should update an existing list', function (done) {
			request(app).post('/api/lists/edit/'+list._id)
			.send({
				name:'updatedNameList'
			})
			.end(function (err,res){
				if (err) {
					done.fail(err);
				} else {
					returnedList = res.body[res.body.length-1];
					expect(returnedList.name).toBe('updatedNameList');
					Todo.findOne({name: 'updatedNameList'})
					done();
				}
			})
		})

	})
})