const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ApiCtrl } = require('../controllers/');
const parseJSON = express.json();
const parseBody = express.urlencoded({ extended: true });

const logger = (req, res, next) => {
	console.log(req.body);
	console.log('request recieved!');
	next();
};

router.post('/login', parseBody, parseJSON, passport.authenticate('local'), ApiCtrl.auth.login);
router.get('/logout', ApiCtrl.auth.logout);
router.get('/init', ApiCtrl.auth.isLoggedIn, (req, res) => {
	res.send(req.user);
});
router.post('/record/create', parseBody, parseJSON, ApiCtrl.auth.isLoggedIn, ApiCtrl.record.create);
router.get('/record/read', ApiCtrl.auth.isLoggedIn, ApiCtrl.record.read);
router.get('/record/read/:id', ApiCtrl.auth.isLoggedIn, ApiCtrl.record.read);
router.put(
	'/record/update/:id',
	parseBody,
	parseJSON,
	ApiCtrl.auth.isLoggedIn,
	ApiCtrl.record.update
);
router.delete('/record/delete/:id', ApiCtrl.auth.isLoggedIn, ApiCtrl.record.delete);
router.post('/users/create', parseBody, parseJSON, ApiCtrl.auth.isLoggedIn, ApiCtrl.user.create);
router.get('/users/read', ApiCtrl.auth.isLoggedIn, ApiCtrl.user.read);
router.get('/users/read/:id', ApiCtrl.auth.isLoggedIn, ApiCtrl.user.read);
router.put('/users/update/:id', parseBody, parseJSON, ApiCtrl.auth.isLoggedIn, ApiCtrl.user.update);
router.delete('/users/delete/:id', ApiCtrl.auth.isLoggedIn, ApiCtrl.user.delete);

module.exports = router;
