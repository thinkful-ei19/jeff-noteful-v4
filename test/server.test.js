'use strict';
const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Server Test', function (){
  let user;
  let token;

  before(function () {
    return mongoose.connect(TEST_MONGODB_URI)
      .then(() => mongoose.connection.db.dropDatabase());
  });


  beforeEach(function () {
    return Promise.all([
      User.insertMany(seedUsers),
      Folder.insertMany(seedFolders),
      Folder.ensureIndexes()
    ]).then(([users]) => {

      user = users[0];
      token = jwt.sign({
        user
      }, JWT_SECRET, {
        subject: user.username
      })
    });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('GET /api/folders', function () {

    it('should return the correct number of folders', function () {
      const dbPromise = Folder.find({
        userId: user.id
      });
      const apiPromise = chai.request(app)
        .get('/api/folders')
        .set('Authorization', `Bearer ${token}`);
      return Promise.all([dbPromise, apiPromise])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);
        });
    });

    it('should return a list with the correct right fields', function () {
      const dbPromise = Folder.find({
        userId: user.id
      });
      const apiPromise = chai
        .request(app)
        .get('/api/folders')
        .set('Authorization', ` Bearer ${token}`)

      return Promise.all([dbPromise, apiPromise])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);
          res.body.forEach(function (item) {
            expect(item).to.be.a('object');
            expect(item).to.have.keys('id', 'name', 'userId');
          });
        });
    });

  });

describe('Reality Check', () => {

  it('true should be true', () => {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4 (except in 1984)', () => {
    expect(2 + 2).to.equal(4);
  });

});

describe('Environment', () => {

  it('NODE_ENV should be "test"', () => {
    expect(process.env.NODE_ENV).to.equal('test');
  });

});

describe('Basic Express setup', () => {

  describe('Express static', () => {

    it('GET request "/" should return the index page', () => {
      return chai.request(app)
        .get('/')
        .then(function (res) {
          expect(res).to.exist;
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });

  });

  describe('404 handler', () => {

    it('should respond with 404 when given a bad path', () => {
      return chai.request(app)
        .get('/bad/path')
        .set('Authorization',`Bearer${token}`)
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });
})
});