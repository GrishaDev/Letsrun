const express = require('express');
const Controller = require('./controller');
const wa = require('../utils/wrapAsync');
const { isValidSignUp, isValidRequest, isValidSign } = require('./validator');
const { isAllowed } = require('./auth');

const router = express.Router();

router.post('/signup', isValidSignUp, wa(Controller.signup));
router.post('/signature', isValidSign, wa(Controller.signature));
router.post('/update', isValidRequest, wa(isAllowed), wa(Controller.update));
router.post('/mystats', isValidRequest, wa(isAllowed), wa(Controller.myStats));

module.exports = router;