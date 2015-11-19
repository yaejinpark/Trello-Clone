// var request = require('supertest'),
//     app = require('../../app').app;

// describe('Authentication Controller', function() {

//     it('should authenticate the user', function(done) {
//         request(app).post('/authenticate')
//         .send({
//           username: 'user',
//           password: 'password1'
//         })      
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end(function(err, res){
//           expect(err).toBeNull();
//           done();
//         });    
//     });

//         it('should not authenticate the user', function(done) {
//         request(app).post('/authenticate')
//         .send({
//           username: 'user',
//           password: 'password1'
//         })      
//         .expect('Content-Type', /json/)
//         .expect(404)
//         .end(function(err, res){
//           expect(err).toBeDefined();
//           done();
//         });  
//     });
// });