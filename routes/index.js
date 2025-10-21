var express = require('express');
const passport = require('passport');
var router = express.Router();
var userModel = require("./users")
const upload = require("./multer")
const recipeModel = require("./recipe");
const commentModel = require("./comment");

const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register',function(req,res,next){
  res.render('register')
});

router.get('/', isLoggedIn,async function(req, res, next) {
  recipe = await recipeModel.find()
  res.render('home', { recipe: recipe });
});

router.get('/profile', isLoggedIn, async function(req, res, next) {
  username = req.session.passport.user;
  const user = await userModel.findOne({username: username}).populate('recipes');
  res.render('profile', { user: user });
})

router.get('/upload', function(req, res, next) {
  res.render('upload');
});

router.get('/update', function(req, res, next) {
  res.render('update');
});

router.get('/logout', function(req,res, next){
  req.logout(function(err){
    if (err) {return next(err)}
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

router.post('/upload', upload.single('image'),async function(req, res) {
  username = req.session.passport.user;
    const user = await userModel.findOne({username: username});
    const recipe = await new recipeModel({
        name: req.body.title,
        image: req.file.filename,
        ingredients: req.body.ingredients,
        instructions: req.body.steps,
        user: user._id
    });
    await user.recipes.push(recipe.id);
    await user.save();
    await recipe.save();
    res.redirect('/')
  });

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

router.post('/update', upload.single('image'),async function(req, res) {
  username = req.session.passport.user;
    const user = await userModel.findOne({username: username});
    user.about = req.body.about;
    if (req.file) {
      user.pp = req.file.filename;
    }
    await user.save();
    res.redirect('/profile');
  });

router.post('/search', async function(req, res) {
  const query = req.body.q;
  const recipes = await recipeModel.find({ name: { $regex: query, $options: 'i' }});
  res.render('searchResults', { recipes: recipes, query: query });
});

module.exports = router;
