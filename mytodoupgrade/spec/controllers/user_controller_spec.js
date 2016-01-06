//necessary modules
var request = require('supertest'),
  bcrypt = require('bcrypt-nodejs'),
  app = require('../../app').app;

//model
var User = require ('../../app/models/user'),
  Board = require('../../app/models/board');

//variables
var auth = {};
var user;
var member;

beforeAll(function (done) {
  var password = 'password',
    salt = bcrypt.genSaltSync(10),
    hash = bcrypt.hashSync(password,salt),
    password2 = 'hiFren',
    salt = bcrypt.genSaltSync(10),
    hash2 = bcrypt.hashSync(password2,salt);

  User.create({
    username: 'potentialmember',
    password: hash,
    email: 'membertest@test.com'
  }, function (error, newMember) {
      if (error) {
        done.fail(error);
      } else {
        member = newMember;
        User.create({
          username: 'imapotato',
          password: hash2,
          email: 'imapotato@test.com'
        }, function (error, dummyUser) {
            if(error) {
              done.fail(error);
            } else {
              user = dummyUser;
              loginUser(auth, done);
            }
        });
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

describe ('UserController', function() {
  describe('with data', function() {
    var board;

    beforeEach(function (done) {
      Board.create({
        _userid: user._id,
        name: 'testMemberBoard'
      }, function (error, newBoard) {
          if (error) {
            done.fail(error);
          } else {
            board = newBoard;
            done();
          }
      });
    });

    afterEach(function (done) {
      Board.remove({_userid:user._id}, function (error, removedBoard) {
        if (error) {
          done.fail(error);
        } else {
          User.remove({username: 'potentialmember'}, function (error, removedMember) {
            if (error) {
              done.fail(error);
            } else {
              done();
            }
          });
        }
      });
    });

      //Test for showing existing user
      it('should return an existing user', function (done) {
        request(app)
        .get('/api/user/'+user._id)
        .set('X-ACCESS-TOKEN', auth.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (error, res){
          if (error) {
            done.fail(error);
          } else {
            expect(res.body.length).toEqual(1);
            returnedUser = res.body[0];
            expect(returnedUser.username).toBe('imapotato');
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
        .end(function (error, res){
          if (error) {
            done.fail(error);
          } else {
            returnedUser = res.body;
            expect(returnedUser.username).toBe('testCreate14');
            User.findOne({ username:'testCreate14'})
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

      //Test for updating a user
      it('should update an existing user', function (done){
        var passwordUpdate = 'updatedPw',
          salt = bcrypt.genSaltSync(10),
          hashUpdate = bcrypt.hashSync(passwordUpdate,salt);

        request(app)
        .post('/api/users/edit/'+user._id)
        .set('X-ACCESS-TOKEN', auth.token)
        .send({
          password: hashUpdate,
          email:'update@test.com'
        })
        .end(function (error,res){
          if (error) {
            done.fail(error);
          } else {
            User.findOne({ _id: user._id}, function (error, returnedUser) {
              if (error) {
                done.fail(error);
              } else {
                expect(returnedUser.email).toBe('update@test.com');
                done();
              }
            });
          }
        });
      });

      //Test for deleting a new user
      it('should delete an existing user', function (done) {
        request(app)
        .post('/api/users/delete/'+user._id)
        .set('X-ACCESS-TOKEN', auth.token)
        .end(function (error, res){
          if (error) {
            done.fail(error);
          } else {
              User.findOne({ _id: user._id})
              .remove(function (error){
                User.findOne({ _id: user._id}, function (error,user){
                  if (error) {
                    done.fail(error);
                  } else {
                    expect(user).toBeNull()
                    done();      
                  }
                });
              });
            }
        });
      });

      //Test for being invited to a board
      it('should invite a new member to a board', function (done) {
        request(app)
        .post('/api/user/'+member._id+'/invite/')
        .send({
          name: board.name
        })
        .set('X-ACCESS-TOKEN', auth.token)
        .end(function (error, res) {
          if (error) {
            done.fail(error);
          } else {
            returnedBoard = res.body;
            expect(returnedBoard._userid).toContain(member._id + '');
            done();
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