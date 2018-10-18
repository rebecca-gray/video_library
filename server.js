const express = require('express');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const authController = require('./app/controllers/authcontroller.js');

const passport = require("passport")
require('./app/passport/passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
//Routes
const auth = require('./app/routes/auth.js');
const user = require('./app/routes/user.js');

app.get('/', authController.login);
app.post('/login', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), user);
app.get('/dashboard', authController.dashboard);
//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.listen(5000, (err) => {
    if (!err) {
        console.log("Site is live");
    } else {
      console.log(err)
    }
});

module.exports = app;
