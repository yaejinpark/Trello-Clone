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
        username: 'testuser4', 
        password: 'testcreate', 
        email: 'test4@test.com' 
      }, function (err, newUser) {
        if (err) {
          console.log(err);
          done.fail(err);
        } else {
          user = newUser;
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

    //Test for showing existing user
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
            expect(returnedUser.username).toBe('testuser4');
            done();
        }
      });
    });

    //Test for creating a new user
    it('should create a new user', function (done) {
      request(app).post('/api/users/create')
      .send({
        username: 'testCreate12',
        password: 'createPw',
        email: 'create12@test.com'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
            returnedUser = res.body[res.body.length-1];
            expect(returnedUser.username).toBe('testCreate12');
            User.findOne({ username:'testCreate12'})
            .remove(function (error){
              done();
            })
        }
      });
    });


  });
});