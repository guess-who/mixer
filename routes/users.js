var express    = require('express')
var passport   = require('passport')
var userRouter = express.Router()

//renders the login form and creates a session
userRouter.route('/login')
    .get(function(req,res){
        res.render('login', {message: req.flash('loginMessage')})
    })
    // .post(/* create account using passport */)
    .post(passport.authenticate('local-login',{
      successRedirect: '/profile',
      failureRedirect: '/login'
    }))

//renders the signup form and creates account
userRouter.route('/signup')
    .get(function(req,res){
      //render create accout form
        res.render('signup')
    })
    // .post(/* create account using passport */)
    .post(passport.authenticate('local-signup',{
      successRedirect: '/profile',
      failureRedirect: '/signup'
    }))

//renders the profile page (ONLY if they are logged in)
userRouter.get('/profile', isLoggedIn, function(req,res){
    //render the user's profile (only if they are currenctly logged in)
})

userRouter.get('/logout', function(req,res){
  req.logout()
  res.redirect('/')
  //destroy the session, and redirect the user back to the home page
})

//a method used to authorize a user before allowing them to proceed to the profile page:
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next()
  req.redirect('/')
}

module.exports = userRouter
