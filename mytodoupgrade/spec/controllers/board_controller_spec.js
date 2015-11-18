var request = require('supertest'),
	app = require('../../app').app;

var Board = require('../../app/models/board'),
	User = require('../../app/models/user'),
	List = require('../../app/models/list');

describe ('BoardController', function() {

	describe('with data', function() {
		var board;
		var user;
		var list;

		beforeEach(function (done){
			User.create({
				username: 'testUserforBoard',
				pssword: 'password',
				email: 'potato@gmail.com'
			}, function (error, newUser) {
				if (error) {
					console.log(error);
					done.fail(error);
				} else {
					user = newUser;
					Board.create({
						_userid: user._id,
						name: 'testBoard'
					}, function (err, newBoard) {
						if (err) {
							console.log(err);
							done.fail(err);
						} else {
							board = newBoard
							List.create({
								_boardid: board._id,
								name: 'testList'
							}, function (e, newList) {
								if (e) {
									console.log(e);
									done.fail(e);
								} else {
									list = newList;
									done();
								}
							})
						}
					})
				}
			})
		})

		afterEach(function (done){
			List.remove({_boardid:board._id}, function (e, removedList) {
				if (e) {
					done.fail(e);
				} else {
					Board.remove({_userid:user._id}, function (err, removedBoard) {
						if (err) {
							done.fail(err);
						} else {
							User.remove({_id:user._id}, function (error, removedUser) {
								done();
							});
						}
					})
					
				}
			})
		});
	})
})