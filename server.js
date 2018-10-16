const express = require('express');
const passport = require("passport")
require('./app/passport/passport');
// const session = require('express-session')
const bodyParser = require('body-parser')
const env = require('dotenv').load();
const models = require("./app/models");
const exphbs = require('express-handlebars');
const authController = require('./app/controllers/authcontroller.js');

const app = express();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
const auth = require('./app/routes/auth.js');
const user = require('./app/routes/user.js');

app.get('/', authController.login);
app.post('/login', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), user);
// app.get('/', function(req, res) {
//     res.send('Welcome to Video Library');
// });

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
