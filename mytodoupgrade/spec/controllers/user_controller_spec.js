var request = require('supertest'),
    app = require('../../app').app;

var User = require ('../../app/models/user');

describe ('UserController', function() {
  // describe('with no data', function() {
  //   it('should return an empty user', function (done) {
  //     request(app).get('/api')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .end(function(err, res){
  //       if (err) {
  //         done.fail(err);
  //       } else {
  //         expect(res.body).toBeTruthy();
  //         done();
  //       }
  //     });
  //   });
  // });

  describe('with data', function() {
    var user;

    beforeEach(function(done) {
      User.create({ 
        username: 'testuser', 
        password: 'testcreate', 
        email: 'test@test.com' 
      }, function (err, newUser) {
        if (err) {
          console.log(err);
          done.fail(err);
        } else {
          console.log(newUser);
          user = newUser;
          done();
        }
      });
    });

    it('should return an existing user', function (done) {
      request(app).get('/api/user/'+user._id)
      .expect('Content-Type', /json/)
      //Making sure that Content-Type is json, not some other element (like html header)
      //Basically checking that the header type contains the word json
      .expect(200)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
            expect(res.body.length).toEqual(1);
            returnedUser = res.body[0];
            expect(returnedUser.username).toBe('testuser');
            done();
        }
      });
    });

    afterEach(function (done) {
      user.remove(function (err, removedUser) {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
    });

  });
});