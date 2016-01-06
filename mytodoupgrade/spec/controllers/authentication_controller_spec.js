//necessary modules
var request = require('supertest'),
  bcrypt = require('bcrypt-nodejs'),
  app = require('../../app').app;

//models
var User = require('../../app/models/user');

beforeAll(function (done) {
  var password = 'password1',
  salt = bcrypt.genSaltSync(10),
  hash = bcrypt.hashSync(password,salt);

  User.create({
    username: 'user',
    password: hash,
    email: 'authTest@test.com'
  }, function (error, dummyUser) {
    if(error) {
      done.fail(error);
    } else {
      user = dummyUser;
      done();
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

describe('Authentication Controller', function() {
  
  it('should authenticate the user', function (done) {
    request(app)
    .post('/api/authenticate')
    .send({
      username: 'user',
      password: 'password1'
    })      
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      expect(err).toBeNull();
      done();
    });    
  });

  it('should not authenticate the user', function (done) {
    request(app)
    .post('/authenticate')
    .send({
      username: 'user',
      password: 'wrongpassword'
    })      
    .expect('Content-Type', /json/)
    .expect(404)
    .end(function (err, res){
      expect(err).toBeDefined();
      done();
    });  
  });
});