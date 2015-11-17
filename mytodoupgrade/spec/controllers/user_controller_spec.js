var request = require('supertest'),
    app = require('../../app').app;

var User = require ('../../app/models/user');

describe ('UserController', function() {

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
                    expect(returnedUser.username).toBe('testuser');
                    done();
                }
            });
        });

        //Test for creating a new user
        it('should create a new user', function (done) {
            request(app).post('/api/users/create')
            .send({
                username: 'testCreate13',
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
                    expect(returnedUser.username).toBe('testCreate13');
                    User.findOne({ username:'testCreate13'})
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
            request(app).post('/api/users/edit/'+user._id)
            .send({
                password:'updatedPw',
                email:'update@test.com'
            })
            .end(function (err,res){
                if (err) {
                  done.fail(err);
                } else {
                    returnedUser = res.body[res.body.length-1];
                    expect(returnedUser.password).toBe('updatedPw');
                    User.findOne({ email:'update@test.com'})
                    done();
                }
            })
        })

    });
});