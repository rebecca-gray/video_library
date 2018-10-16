const express = require("express");
const router  = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

/* POST login. */
router.post('/login', function (req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        console.log("@@ in", err, user, info)
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user,
                err: err
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, '123');
           return res.json({user, token});
        });
    })(req, res);
});

module.exports = router;

// const authController = require('../controllers/authcontroller.js');
//
// const isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated())
//       return next();
//   res.redirect('/signin');
// }
//
// module.exports = function(app, passport) {
//     app.get('/signup', authController.signup);
//     app.get('/signin', authController.signin);
//     app.get('/dashboard',isLoggedIn, authController.dashboard);
//     app.get('/logout',authController.logout);
//
//     app.post('/signup', passport.authenticate('local-signup', {
//             successRedirect: '/dashboard',
//
//             failureRedirect: '/signup'
//         }
//
//     ));
//
//     app.post('/signin', passport.authenticate('local-signin', {
//             successRedirect: '/dashboard',
//
//             failureRedirect: '/signin'
//         }
//
//     ));
// }
