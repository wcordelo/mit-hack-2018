const app = require('./config/server');

// require('./routes/users')(app);

const path = require('path');
const cookeParser = require('cookie-parser');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const ejs = require('ejs');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const index = require('./routes/index');
// const users = require('./routes/users');

require('./config/passport')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookeParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, }));

app.use(expressValidator());

app.use(flash());

app.use(function(req, res, next){
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
