const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')

function tokenForUser(user){
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next){
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req, res, next){

  const email = req.body.email
  const password = req.body.password

  if(!email || !password){
    return res.status(422).send({ error: 'You must provide an email and a password' })
  }

  // see if the user with given mail exists

  User.findOne({ email: email }, function(err, existingUser){
    //if exists return error
    if(err) {return next(err);}
    if(existingUser){
      return res.status(422).send({error: 'Email is in use'}) //422 is for unprocessable entity
    }
  })

  //if not create and save user record
  const user = new User({
    email: email,
    password: password
  })

  user.save(function(err){
    if(err){
      return next(err)
    }
    res.json({token: tokenForUser(user)});
  }) // saves to databases

  //Respond to request indicating user create


}
