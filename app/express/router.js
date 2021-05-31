const express = require('express');
const Controller = require('./controller');
const wa = require('../utils/wrapAsync');

const router = express.Router();

router.post('/signup', wa(Controller.signup));
router.post('/signature', wa(Controller.signature));
router.post('/update', wa(Controller.update));

module.exports = router;