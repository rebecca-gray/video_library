
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const passportJWT = require("passport-jwt");
// const JWTStrategy   = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;
const { User } = require("../models");
const bCrypt = require('bcrypt-nodejs');

const generateHash = (password) =>
    bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = '123';
// opts.issuer = '';
// opts.audience = '';
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//            var userPassword = generateHash(password);
//            var data = {
//                    username: username,
//                    password: userPassword
//            };
//            User.create(data).then((newUser, created) => {
//                if (!newUser) {
//                    return done(null, false);
//                }
//                if (newUser) {
//                    return done(null, newUser);
//                }
//            });
//         }
//     });
// }));
//
//
// passport.use("local", new LocalStrategy({
//         usernameField: 'username',
//         passwordField: 'password'
//     },
//     function (email, password, cb) {
//         //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//         return Users.findOne({email, password})
//            .then(user => {
//                console.log("@@ user find one", user);
//                if (!user) {
//                    return cb(null, false, {message: 'Incorrect email or password.'});
//                }
//                return cb(null, user, {message: 'Logged In Successfully'});
//           })
//           .catch(err => cb(err));
//     }
// ));

// const bCrypt = require('bcrypt-nodejs');
//
module.exports = (passport, user) => {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            (req, email, password, done) => {
                User.findOne({
                    where: {
                        email: email
                    }
                }).then((user) => {
                    if (user) {
                        return done(null, false, {
                            message: 'That email is already taken'
                        });
                    } else {
                        const userPassword = generateHash(password);
                        const data = {
                                username: username,
                                password: userPassword,
                        };
                        User.create(data).then((newUser, created) => {
                            if (!newUser) {
                                return done(null, false);
                            }
                            if (newUser) {
                                return done(null, newUser);
                            }
                        });
                    }
                });
            }
        ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        (req, email, password, done) => {
            const User = user;
            const isValidPassword = (userpass, password) =>
                bCrypt.compareSync(password, userpass);

            User.findOne({
                where: {
                    username: username
                }
            }).then((user) => {
                if (!user) {
                    return done(null, false, {
                        message: 'username does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                const userinfo = user.get();
                return done(null, userinfo);
            }).catch((err) => {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));

   //serialize
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}
