const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
var models  = require('../models/index');
/* POST login. */
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            // create user
            // add bcrypt for password
            models.User.create({
                email: req.body.email,
                password: req.body.password,
            }).then((user) => {
                const body = JSON.stringify({ _id : user.id, email : user.email });
                const token = jwt.sign({ user: body }, 'your_jwt_secret');
                return res.redirect('/dashboard');
            })
        }
    //    req.login(user, {session: false}, (err) => {
    //        if (err) {
    //            res.send(err);
    //        }
    //        console.log("@@ user", req)
    //        // generate a signed son web token with the contents of user object and return it in the response
    //        const body = JSON.stringify({ _id : 123, email : user.email });
    //        const token = jwt.sign({ user: body }, 'your_jwt_secret');
    //        return res.json({user, token});
    //     });
    })(req, res);
});

module.exports = router;
