const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../controllers/auth")

//Validator
const {runValidation} = require('../validator');
const {categoryCreateValidator} = require('../validator/category');

router.post('/category',requireSignin, adminMiddleware, categoryCreateValidator, runValidation, create);
router.get('/categories',requireSignin, adminMiddleware, list);
router.get('/category/:slug',requireSignin, adminMiddleware, read);
router.delete('/category/:slug',requireSignin, adminMiddleware, remove);


module.exports = router;