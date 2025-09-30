var express = require('express');
const passport = require('passport');
var router = express.Router();
var userModel = require("./users")

const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register',function(req,res,next){
  res.render('register')
})

router.get('/', isLoggedIn, function(req, res, next) {
  res.render('home');
});

router.get('/logout', function(req,res, next){
  req.logout(function(err){
    if (err) {return next(err); }
    res.redirect('/');
  });
});

router.post('/register',function(req,res){
  var userdata = new userModel({
    username: req.body.username
  });
  userModel.register(userdata, req.body.password)
    .then(function(registereduser){
      passport.authenticate('local')(req,res,function(){
        res.redirect('/');
      });
    });
})

router.post('/login', passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/login"
  }), function(req,res){});

function isLoggedIn(req,res,next)
{ if (req.isAuthenticated()){
  return next();
}
  else{
    res.redirect('/login');
  }
}
module.exports = router;
