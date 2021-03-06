const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')
const userService = require('../services/user-service')


passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    User.findOne({ email }).then((user) => {
      if (!user) return done("Bad credentials", null)

      if(email === user.email && userService.comparePassword(email, password)) {
        return done(null, user)
      }

      return done("Bad credentials", null)
    })
  }
))

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser(async(id, done) => {
  const user = await User.findById(id)
  done(null, user);
})

module.exports = {
  admin: function(req, res, next) {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.redirect(302, '/login')
    }
  },
  user: function(req, res, next) {
    if (req.user) {
      next()
    } else {
      res.redirect(302, '/login')
    }
  },
}


