// 'use strict';
// const app = require('../server');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken')
// const {
//   TEST_MONGODB_URI,
//   JWT_SECRET
// } = require('../config');

// const User = require('../models/user')
// const seedUsers = require('../db/seed/users')


// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('Noteful API - Login', function () {
//   // let token;
//   // const fullname = 'Example User';
//   // const username = 'exampleUser';
//   // const password = 'examplePass';

//   before(function () {
//     return mongoose.connect(TEST_MONGODB_URI)
//       .then(() => mongoose.connection.db.dropDatabase());
//   });

//   beforeEach(function () {
//     return User.insertMany(seedUsers)
//   });

//   afterEach(function () {
//     return mongoose.connection.db.dropDatabase();
//   });

//   after(function () {
//     return mongoose.disconnect();
//   });

//   describe('Noteful /api/login', function () {

//     it('Sould return a valid auth token', function () {
//       return chai.request(app)
//         .post('/api/login')
//         .send({
//           username: 'user0',
//           password: 'password'
//         })
//         .then(res => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body.authToken).to.be.a('string');
//           const token = res.body.authToken;
//           const payload = jwt.verify(res.body.authToken, JWT_SECRET);

//           expect(payload.user).to.not.have.property('password');
//           expect(payload.user).to.deep.equal({
//             "id": "333333333333333333333300",
//             "fullname": "User Zero",
//             "username": "user0"

//           });
//         });
//     });
//     it('Should reject requests with no credentials',function(){
//       return chai
//       .request(app)
//       .post('/api/login')
//       .then(()=>
//     expect.fail(null,null, 'Request should not succeed')
//   )
//   .catch(err => {
//     if(err instanceof chai.AssertionError){
//       throw err;
//     }
//   })
//   const res = err.response;
//   expect(res).to.have.status(400)
//     });
//     it('Should reject requests with incorrect usernames',function(){
//       return chai
//       .request(app)
//       .post('/api/login')
//       .send({username:'WrongUsername',password:'password'})
//       .then(()=>
//       expect.fail(null,null, 'Request should not succeed')
//     )
//     .catch(err => {
//       if(err instanceof chai.AssertionError){
//         throw err;
//       }
//       const res = err.response;
//       expect(res).to.have.status(401)
//     })
//     })
//     it('Should reject requests with incorrect passwords',function(){
//       return chai
//       .request(app)
//       .post('/api/login')
//       .send({username:'user0',password:'password 1=1'})
//       .then(()=>
//     expect.fail(null,null, 'Request should not succeed'))
//     .catch(err => {
//       if(err instanceof chai.AssertionError){
//         throw err;
//       }
//       const res = err.response;
//       expect(res).to.have.status(401)
//     })
//     });
//   });
// });