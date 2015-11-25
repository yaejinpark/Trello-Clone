//necessary modules
var request = require('supertest'),
    bcrypt = require('bcrypt-nodejs'),
    app = require('../../app').app;

//model
var User = require ('../../app/models/user'),
    Board = require('../../app/models/board');

//variables
var auth = {};

beforeAll(loginUser(auth));

describe ('UserController', function() {

    describe('with data', function() {
        var user;
        var board;
        var member;

        beforeEach(function (done) {
            User.create({ 
                username: 'boardcreator', 
                password: 'testcreate', 
                email: 'test@test.com' 
            }, function (err, newUser) {
                if (err) {
                    console.log(err);
                    done.fail(err);
                } else {
                    user = newUser;
                    Board.create({
                        _userid: user._id,
                        name: 'testMemberBoard'
                    }, function (error, newBoard) {
                        if (error) {
                            console.log(error);
                            done.fail(error);
                        } else {
                            board = newBoard;
                            User.create({
                                username:'potentialmember',
                                password:'password',
                                email:'membertest@test.com'
                            }, function (e, newMember) {
                                if (e) {
                                    console.log(e);
                                    done.fail(e);
                                } else {
                                    member = newMember;
                                    done();
                                }
                            })
                        }
                    })
                }
            });
        });

        afterEach(function (done) {
            User.remove({_id: member._id}, function (error, removedMember) {
                if (error) {
                    done.fail(error);
                } else {
                    Board.remove({_userid:user._id}, function (error, removedBoard) {
                        if (error) {
                            done.fail(error);
                        } else {
                            User.remove({_id: user._id}, function (error, removedUser) {
                                if (error) {
                                    done.fail(error);
                                } else {
                                    done();
                                }
                            })
                        }
                    })
                }
            })
        });

        //Test for showing existing user
        it('should return an existing user', function (done) {
            request(app)
            .get('/api/user/'+user._id)
            .set('X-ACCESS-TOKEN', auth.token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res){
                if (err) {
                  done.fail(err);
                } else {
                    expect(res.body.length).toEqual(1);
                    returnedUser = res.body[0];
                    expect(returnedUser.username).toBe('boardcreator');
                    done();
                }
            });
        });

        //Test for creating a new user
        it('should create a new user', function (done) {
            request(app).post('/api/users/create')
            .send({
                username: 'testCreate14',
                password: 'createPw',
                email: 'create14@test.com'
            })
            .set('X-ACCESS-TOKEN', auth.token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res){
                if (err) {
                  done.fail(err);
                } else {
                    returnedUser = res.body;
                    expect(returnedUser.username).toBe('testCreate14');
                    User.findOne({ username:'testCreate14'})
                    .remove(function (error){
                        done();
                    })
                }
            });
        });

        //Test for deleting a new user
        it('should delete an existing user', function (done) {
            request(app)
            .post('/api/users/delete/'+user._id)
            .set('X-ACCESS-TOKEN', auth.token)
            .end(function (err, res){
                if (err) {
                  done.fail(err);
                } else {
                    User.findOne({ _id: user._id})
                    .remove(function (error){
                        User.findOne({ _id: user._id}, function (err,user){
                            if (err) {
                                done.fail(err);
                            } else {
                                expect(user).toBeNull()
                                done();      
                            }
                        })
                    })
                }
            });
        });

        //Test for updating a user
        it('should update an existing user', function (done){
            request(app)
            .post('/api/users/edit/'+user._id)
            .set('X-ACCESS-TOKEN', auth.token)
            .send({
                password: 'updatedPw',
                email:'update@test.com'
            })
            .end(function (err,res){
                if (err) {
                  done.fail(err);
                } else {
                    returnedUser = res.body[res.body.length-2];
                    expect(returnedUser.email).toBe('update@test.com');
                    User.findOne({ email:'update@test.com'})
                    done();
                }
            })
        })

        //Test for being invited to a board
        it('should invite a new member to a board', function (done) {
            request(app)
            .post('/api/user/'+member._id+'/invite/')
            .send({
                name: board.name
            })
            .set('X-ACCESS-TOKEN', auth.token)
            .end(function (err, res) {
                if (err) {
                    done.fail(err);
                } else {
                    returnedBoard = res.body;
                    expect(returnedBoard._userid).toContain(member._id + '');
                    done();
                }
            })

        })

    });
});

//****NOTE: In order for this function to work, you have to manually make that account.
//Needs to be refactored so that the account is created just through the function

function loginUser(auth) {
    return function (done) {
        request(app)
        .post('/api/authenticate')
        .send({
            username: 'imapotato',
            password: 'hiFren'
        })
        .expect(200)
        .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    }
    return done();
}