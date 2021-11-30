const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
    requireTitle: check('title')
        .trim()
        .isLength({ min: 5, max: 40 })
        .withMessage('Must be 5-40 chars!'),
    requirePrice: check('price')
        .trim()
        .toFloat()
        .isFloat({ min: 1 })
        .withMessage('Must be float > 1'),
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email!')
        .custom(async email => {
            const existingUser = await usersRepo.getOneBy({ email });
            if (existingUser)
                throw new Error('Email in use!');
        }),
    requirePassword: check('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Must be a valid password!'),
    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Must be a valid password!')
        .custom(async (passwordConfirmation, { req }) => {
            if (passwordConfirmation !== req.body.password)
                throw new Error('Passwords dont match!');
        }),
    requireEmailExists: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide a valid email!')
        .custom(async email => {
            const user = await usersRepo.getOneBy({ email });
            if (!user) {
                throw new Error('Email not found!');
            }
        }),
    requireValidPassword: check('password')
        .trim()
        .custom(async (password, { req }) => {
            const user = await usersRepo.getOneBy({ email: req.body.email });
            if (!user) {
                throw new Error('invalid Password');
            }

            const validPassword = await comarePasswords(user.password, password);
            if (!validPassword)
                throw new Error('Invalid password!');
        })
};