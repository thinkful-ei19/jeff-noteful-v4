const {
  Strategy: LocalStrategy
} = require('passport-local');
const User = require('../models/user')

const localStrategy = new LocalStrategy(function(username,password,done){
console.log(username,password)

User.findOne({
    username
  })
  .then(user => {
    console.log(user)
    if (!user) {
      // Removed for brevity
    }
    const isValid = user.validatePassword(password);
    console.log(isValid)
    if (!isValid) {
      // Removed for brevity
    }
    return done(null, user);
  })
  .catch(err => {
    // Removed for brevity
  });
});
//
module.exports = localStrategy;