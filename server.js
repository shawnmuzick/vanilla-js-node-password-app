const express = require('express');
const router = require('./routes/');
const passport = require('passport');
const session = require('express-session');
const PORT = process.env.PORT || 5000;
const assets = express.static('public');
const app = express();

app.set('view engine', 'ejs');
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);
app.use('/api', router);
app.use('/assets', assets);

app.use('/register', (req, res, next) => {
	res.render('register');
});
app.use('/login', (req, res, next) => {
	res.render('index');
});
app.use('/', (req, res, next) => {
	res.render('index');
});
app.listen(PORT, () => {
	console.log(`App running on port:${PORT}`);
});
