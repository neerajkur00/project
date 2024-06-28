var express = require('express');
const schema = require('../models/userSchema');
const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(schema.authenticate()));

var router = express.Router();
const upload = require('../utils/multer').single('image')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {user: req.user });
});


router.get('/register', function (req, res, next) {
  res.render('register' ,{ user: req.user})
})
router.post('/register', upload, async function (req, res, next) {
  try {
    const { username, email, name, password } = req.body;
    await schema.register({ name, username, email }, password);
    res.redirect("/login");

  } catch (err) {
    res.send(err)
  }

})

router.get('/profile',isLoggedIn, async function (req, res, next) {
  // const red = await schema.find();
  res.render('profile', { red:req.user })
  // console.log(red)
  // res.send("hy")
})

router.get("/updateprofile", function (req, res, next) {
  res.render("update")
})
router.post('/update_profile', upload, async (req, res, next) => {

  const updateuser = await schema.findOneAndUpdate({},{

    // image:req.red.filenam,
    name: req.red.name,
    username: req.red.username,
    email: req.red.email,
  


  })
  
  await updateuser.save();
  res.redirect('/profile')
})

router.get('/login', function (req, res, next) {
  res.render('login', { user: req.user})
})
router.post('/login',passport.authenticate('local',{
  successRedirect:'/mainpage',
  failureRedirect:'/login',
}))

router.get('/mainpage', isLoggedIn, function (req, res, next) {
  res.render('mainpage')
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect("/login");
  }
}

router.get('/logout', function(req, res, next){
  req.logOut(function(err){
    if (err){
      return next(err)
    }
    res.redirect('/login')
  })
})

router.get('/explore',function(req, res, next){
  res.render('firstexplore')
})
router.get('/buy',function(req, res, next){
  res.render('firstexplorebuy')
})

router.get('/resetpassword', isLoggedIn, function(req, res, next){
  res.render('reset', { user: req.user})
})

router.post('/resetpassword/:_id', isLoggedIn, async function(req, res, next){

  try {
    await req.user.changePassword(
      req.body.oldPassword,
      req.body.newPassword
    )
    req.save();
    res.redirect(`/profile/${req.user._id}`);
  } catch (error) {
    res.send(error)
  }

})

// router.get('/forget-password' , function(req, res, next){
//   res.render('userforgetpassword' ,{user: req.user, id: req.params.id})
// })
// router.post('/forget-password/:id', async function(req, res, next){
//   try {
//     const user = await schema.findById(req.params.id)
//     await user.setPassword(req.body.password)
//     await user.save()
//     res.send('/login')
//   } catch (error) {
//     res.send(error)
//   }
// })
module.exports = router;
