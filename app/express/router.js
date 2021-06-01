const express = require('express');
const Controller = require('./controller');
const wa = require('../utils/wrapAsync');
const { isValidSignUp, isValidRequest, isValidSign } = require('./validator');
const { isAllowed } = require('./auth');

const router = express.Router();

router.post('/signup', isValidSignUp, wa(Controller.signup));
router.post('/token', isValidSign, wa(Controller.getToken));
router.post('/update', isValidRequest, wa(isAllowed), wa(Controller.update));
router.post('/mystats', isValidRequest, wa(isAllowed), wa(Controller.myStats));

module.exports = router;