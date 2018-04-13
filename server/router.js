const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })

const requireSignIn = passport.authenticate('local', { session: false })

module.exports = function(app){
  //req is request, res is response, next is for error handling
  app.get('/', requireAuth, function(req, res){
    res.send({ message: 'Super secret code is ABC123' })
  })
  app.post('/signin', requireSignIn, Authentication.signin)
  app.post('/signup', Authentication.signup);

}
