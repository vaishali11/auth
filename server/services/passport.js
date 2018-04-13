//help us authenticate User
const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
//Create local stragegy
const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  User.findOne({ email: email }, function(err, user){
    if(err){ return done(err) }

    if(!user){ return done(null, false) }

    //compare password - is password equal to user.password
    user.comparePassword(password, function(err, isMatch){
      if(err){ return done(err) }

      if(!isMatch){ return done(null, false) }

      return done(null, user)
    })

  })
})



//Set up options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // see if user id in the payload exists in the database
  // if it does call done()
  // if not call done() without user object

  User.findById(payload.sub, function(err, user){
    if(err){
      return done(err, false)
    }

    if(user){
      done(null, user)
    } else{
      done(null, false)
    }


  })
})

//Tell passport to use this Strategy

passport.use(jwtLogin);
passport.use(localLogin)
