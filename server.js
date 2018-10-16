const express = require('express');
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const env = require('dotenv').load();
const models = require("./app/models");
const exphbs = require('express-handlebars');

const app = express();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Routes
const authRoute = require('./app/routes/auth.js')(app, passport);

//load passport strategies
require('./app/config/passport.js')(passport, models.user);

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', function(req, res) {

    res.send('Welcome to Passport with Sequelize');

});

//Sync Database
models.sequelize.sync().then(() => {
    console.log('Nice! Database looks fine');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});

app.listen(5000, (err) => {

    if (!err) {
        console.log("Site is live");
    } else {
      console.log(err)
    }
});
