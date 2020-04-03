const { check } = require('express-validator');

exports.contactFormValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('message')
        .not()
        .isEmpty()
        .isLength({ min : 20 })
        .withMessage('Message must be of at least 20 characters')    
];
