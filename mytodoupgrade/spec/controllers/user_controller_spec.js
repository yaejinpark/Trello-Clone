var request = require('supertest'),
    app = require('../../app').app;

var User = require ('../../app/models/user');

describe ('UserController', function() {

    describe('with data', function() {
        var user;

        beforeEach(function(done) {
            User.create({ 
                username: 'testuser10', 
                password: 'testcreate', 
                email: 'test10@test.com' 
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
                    expect(returnedUser.username).toBe('testuser10');
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

        //Test for deleting a new user
        it('should delete an existing user', function (done) {
            request(app).post('/api/users/delete/'+user._id)
            .end(function (err, res){
                if (err) {
                  done.fail(err);
                } else {
                    var returnedUser = res.body[res.body.length-1];
                    User.findOne({ username:'testCreate'})
                    .remove(function (error){
                        expect(returnedUser).toBeUndefined()
                        done();
                    })
                }
            });
        });

        //Test for updating user
        it('should update an existing user', function (done){
            request(app).post('/api/users/edit/'+user._id)
            .field(
                'password','updatedPw'
                // email:'update@test.com'
            )
            // .expect('Content-Type', /json/)
            .end(function (err,res){
                if (err) {
                  done.fail(err);
                } else {
                    console.log(res.body);
                    returnedUser = res.body[res.body.length-1];
                    console.log(returnedUser);
                    expect(returnedUser.password).toBe('updatedPw');
                    User.findOne({ email:'update@test.com'})
                    done();
                }
            })
        })

    });
});