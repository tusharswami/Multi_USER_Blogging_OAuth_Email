const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/tag');

//Validator
const { runValidation } = require('../validator/index');
const { tagCreateValidator } = require('../validator/tag');

router.post('/tag', requireSignin, adminMiddleware, tagCreateValidator, runValidation, create);
router.get('/tags', requireSignin, adminMiddleware, list);
router.get('/tag/:slug', requireSignin, adminMiddleware, read);
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;