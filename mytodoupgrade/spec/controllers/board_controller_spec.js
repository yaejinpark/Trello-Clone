// necessary modules
// var request = require('supertest'),
// 	app = require('../../app').app;

// var Board = require('../../app/models/board'),
// 	User = require('../../app/models/user'),
// 	List = require('../../app/models/list');

// describe ('BoardController', function() {

// 	describe('with data', function() {
// 		var board;
// 		var user;
// 		var list;

// 		beforeEach(function (done){
// 			User.create({
// 				username: 'testUserforBoard',
// 				password: 'password',
// 				email: 'potato@gmail.com'
// 			}, function (error, newUser) {
// 				if (error) {
// 					console.log(error);
// 					done.fail(error);
// 				} else {
// 					user = newUser;
// 					Board.create({
// 						_userid: user._id,
// 						name: 'testBoard'
// 					}, function (err, newBoard) {
// 						if (err) {
// 							console.log(err);
// 							done.fail(err);
// 						} else {
// 							board = newBoard
// 							List.create({
// 								_boardid: board._id,
// 								name: 'testListForBoard'
// 							}, function (e, newList) {
// 								if (e) {
// 									console.log(e);
// 									done.fail(e);
// 								} else {
// 									list = newList;
// 									done();
// 								}
// 							})
// 						}
// 					})
// 				}
// 			})
// 		})

// 		afterEach(function (done){
// 			List.remove({_boardid:board._id}, function (e, removedList) {
// 				if (e) {
// 					done.fail(e);
// 				} else {
// 					Board.remove({_userid:user._id}, function (err, removedBoard) {
// 						if (err) {
// 							done.fail(err);
// 						} else {
// 							User.remove({_id:user._id}, function (error, removedUser) {
// 								done();
// 							});
// 						}
// 					})
					
// 				}
// 			})
// 		});

// 		//Test for showing a board
// 		it('should show an existing board', function (done) {
// 			request(app).get('/api/board/'+board._id)
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res){
// 				if (err) {
// 					done.fail(err);
// 				} else {
// 					// console.log(res.body);
// 					expect(res.body.length).toEqual(1);
// 					returnedBoard = res.body[0];
// 					expect(returnedBoard.name).toBe('testBoard');
// 					done();
// 				}
// 			})
// 		})

		// //Test for creating a new board
		// it('should create a new board', function (done) {
		// 	var userId = user._id;
		// 	// console.log('user._id: ',userId);
		// 	// console.log('board._userid: ' ,board._userid);
		// 	request(app).get('/api/boards/create/'+userId)
		// 	.send({
		// 		name: 'testBoardCreate'
		// 	})
		// 	// .expect('Content-Type', /json/)
		// 	// .expect(200)
		// 	.end(function (err, res) {
		// 		if (err) {
		// 			done.fail(err);
		// 		} else {
		// 			returnedBoard = res.body;
		// 			// console.log(res.body);
		// 			expect(returnedBoard.name).toBe('testBoardCreate');
		// 			Board.findOne({name: 'testBoardCreate'})
		// 			.remove(function (error) {
		// 				done();
		// 			})
		// 		}
		// 	})
		// })

// 		//Test for deleting an existing board
// 		it('should delete an existing board', function (done) {
// 			request(app).post('/api/boards/delete/'+board._id)
// 			.end(function (err, res) {
// 				if (err) {
// 					done.fail(err);
// 				} else {
// 					Board.findOne({ _id: board._id})
// 					.remove(function (error) {
// 						Board.findOne({ _id: board._id}, function (err, board) {
// 							if (err) {
// 								done.fail(err);
// 							} else {
// 								expect(board).toBeNull()
// 								done();
// 							}
// 						})
// 					})
// 				}
// 			})
// 		})

// 		//Test for updating a board
// 		it('should update an existing board', function (done) {
// 			request(app).post('/api/boards/edit/'+board._id)
// 			.send({
// 				name: 'updatedBoard'
// 			})
// 			.end(function (err,res) {
// 				if (err) {
// 					done.fail(err);
// 				} else {
// 					returnedBoard = res.body[res.body.length-1];
// 					expect(returnedBoard.name).toBe('updatedBoard');
// 					Board.findOne({ name: 'updatedBoard'})
// 					done();
// 				}
// 			})
// 		})
// 	})
// })