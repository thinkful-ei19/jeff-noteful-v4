// 'use strict';

// const app = require('../server');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const { TEST_MONGODB_URI } = require('../config'); ('../config');

// const User = require('../models/user');

// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('Noteful API - Users', function () {
//   const username = 'exampleUser';
//   const password = 'examplePass';
//   const fullname = 'Example User';

//   before(function () {
//     return mongoose.connect(TEST_MONGODB_URI)
//       .then(() => mongoose.connection.db.dropDatabase());
//   });

//   beforeEach(function () {
//   User.ensureIndexes();
//   });

//   afterEach(function () {
//     return mongoose.connection.db.dropDatabase();
//   });

//   after(function () {
//     return mongoose.disconnect();
//   });

//   describe('/api/users', function () {
//     describe('POST', function () {
//       it('Should create a new user', function () {
//         const testUser = { username, password, fullname };

//         let res;
//         return chai
//         .request(app)
//         .post('/api/users')
//         .send(testUser)
//           .then(_res => {
//             res = _res;
//             expect(res).to.have.status(201);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.keys('id', 'username', 'fullname');

//             expect(res.body.id).to.exist;
//             expect(res.body.username).to.equal(testUser.username);
//             expect(res.body.fullname).to.equal(testUser.fullname);

//             return User.findOne({ username });
//           })
//           .then(user => {
//             console.log(user);
//             expect(user).to.exist;
//             expect(user.id).to.equal(res.body.id);
//             expect(user.fullname).to.equal(testUser.fullname);
//             return user.validatePassword(password);
//           })
//           .then(isValid => {
//             expect(isValid).to.be.true;
//           });
//       });
//       it('Should reject users with missing username', function () {
//         const testUser = { password, fullname };
//         return chai.request(app).post('/api/users').send(testUser)
//           .then(() => expect.fail(null, null, 'Request should not succeed')
//           )
          
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }
//             const res = err.response ;
        
//             expect(res).to.have.status(422);
//             // expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(`Missing username in request Body`);
//             // expect(res.body.location).to.equal('username'); 

//           });  
//       });
//             /**
//              * CREATE YOUR ASSERTIONS HERE
//              */

//           // });
//       // });

//       /**
//        * COMPLETE ALL THE FOLLOWING TESTS
//        */
//       it('Should reject users with missing password', function(){
//         return chai
//         .request(app)
//         .post('/api/users')
//         .send({username,fullname})
//         .then(res=>{
//           console.log(res.status);
//           expect.fail(null,null,'Request should not succed');
//         })
//         .catch(err =>{
//           if(err instanceof chai.AssertionError){
//             throw err;
//           }
//           const res = err.response;
//           expect(res).to.have.status(422);
//           expect(res.body.message).to.equal('Missing password in request Body')
//         })
//       });

//       it('Should reject users with non-string username', function(){
//         return chai
//         .request(app)
//         .post('/api/users')
//         .send({username:123,fullname,password})
//         .catch(err =>
//         err.response)
//         .then(res =>{
//           // console.log(res)
//           expect(res).to.have.status(422)
//           expect(res.body.message).to.equal('Missing username in request Body')
          
//         });
//       });
      
//       it('Should reject users with non-string password',function(){
        
//         return chai
//         .request(app)
//         .post('/api/users')
//         .send({username,
//           password:123,
//           fullname})
//         .catch(err =>
//         err.response)
//         .then(res =>{
//           expect(res).to.have.status(422)
//           expect(res.body.message).to.equal('Missing password in request Body')
//         })
//       });
//       it('Should reject users with non-trimmed username',function(){
//         return chai
//         .request(app)
//         .post('/api/users')
//         .send({username:` ${username} `,password,fullname})
//         .catch(err =>
//         err.response)
//         .then(res =>{
//           expect(res).to.have.status(422)
//           expect(res.body.message).to.equal('The username already exist')
//         })
//       });
//       it('Should reject users with non-trimmed password',function(){
//         return chai
//         .request(app)
//         .post('/api/users')
//         .send({username,password:` ${password} `,fullname})
//         .catch(err =>
//         err.response)
//         .then(res =>{
//            console.log(res.status)
//           expect(res).to.have.status(422)
//           expect(res.body.message).to.equal('Missing password in request Body')
//         })
//       });
  
//       it('Should reject users with empty username',function(){
//         return chai
//         .request(app)
//         .post('/api/users')
//         .send({username:'   ' ,password, fullname})
//         .catch(err => 
//         err.response)
//         .then(res =>{
//           expect(res).to.have.status(422)
//           expect(res.body.message).to.equal('Missing username in request Body')
//         })
//       });
//       it('Should reject users with password less than 8 characters',function(){
//         return chai
//         .request(app)
//         .post('/api/users')
//         .send({username,password:'123',fullname})
//         .catch(err =>
//         err.response)
//         .then(res =>{
//           expect(res).to.have.status(422)
//           expect(res.body.message).to.equal('Field: password must be at least 8 characters long ')
//         })
//       });
//       it('Should reject users with password greater than 72 characters',function(){
//         return chai
//         .request(app)
//         .post('/api/users')
//         .send({
//           username,
//           password:new Array(73).fill('a').join(''),
//           fullname
//         })
//         .catch(err =>
//         err.response)
//         .then(res =>{
//           expect(res).to.have.status(422)
//           expect(res.body.message).to.equal('Field: password must be at least 72 characters long')
//         })
//       });
//       it('Should reject users with duplicate username',function(){
//         return User.create({
//           username,
//           password,
//           fullname
//         })
//         .then(()=>
//          chai.request(app)
//         .post('/api/users')
//         .send({
//           username,
//           password,
//           fullname
//         }))
//         .catch(err=>
//         err.response)
//         .then(res =>{
//           console.log(res.status)
//           expect(res).to.have.status(400)
//           expect(res.body.message).to.equal('The username already exists')
//         })
//       });
//       it('Should trim fullname',function(){
//         return chai 
//         .request(app)
//         .post('/api/users')
//         .send({
//           username,
//           password,
//           fullname:` ${fullname}   `
//         })
//         .catch(err =>
//         err.response)
//         .then(res => {
//           expect(res).to.have.status(201)
//           expect(res.body.fullname).to.equal(fullname)
//         })
//       })
//     });


//   });
// });