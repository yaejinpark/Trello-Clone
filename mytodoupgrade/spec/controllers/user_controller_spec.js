var request = require('supertest'),
    app = require('../../app').app;

var Owner = require ('../../app/models/owner');

describe ('OwnersController', function() {
  describe('with no data', function() {
    it('should return an empty list', function(done) {
      request(app).get('/owners')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body).toEqual([]);
          done();
        }
      });
    });
  });

  describe('with data', function() {
    var owner;

    beforeEach(function(done) {
      Owner.create({ name: 'test owner' }, function(err, newOwner) {
        if (err) {
          console.log(err);
          done.fail(err);
        } else {
          console.log(newOwner);
          owner = newOwner;
          done();
        }
      });
    });

    it('should return a list of 1 owner', function(done) {
      request(app).get('/owners')
      .expect('Content-Type', /json/)
      //Making sure that Content-Type is json, not some other element (like html header)
      //Basically checking that the header type contains the word json
      .expect(200)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
            expect(res.body.length).toEqual(1);
            returnedOwner = res.body[0];
            expect(returnedOwner.name).toEqual(owner.name);
            done();
        }
      });
    });

    afterEach(function(done) {
      owner.remove(function(err, removedOwner) {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
    });
  });
});