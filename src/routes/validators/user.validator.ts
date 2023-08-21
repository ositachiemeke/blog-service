import { body } from 'express-validator';
import UserFactoryClass from '../../../src/controllers/factories/User.factory';
const UserFactory = new UserFactoryClass();
const loginValidators = [
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format')
        .custom((email, { req }) => {
            if (!email && !req.body.username) {
                return false;
            }
            return true;
        })
        .withMessage("email or password filed is required"),
    body('username')
        .optional()
        .custom((username, { req }) => {
            if (!username && !req.body.email) {
                return false;
            }
            return true;
        })
        .withMessage("email or password filed is required"),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

const updateValidators = [
    body('name')
        .custom((name) => {
            return typeof name === "string"
        })
        .withMessage("name must be a string"),
    body('password')
        .custom((password, { req }) => {
            return password === req.body.confirm_password;
        })
        .withMessage("passwords do not match")
];


const registrationValidators = [
    body('username')
        .exists()
        .withMessage('Username is required')
        .custom(async (username) => {
            if (await UserFactory.isUsernameUnique(username)) {
                throw new Error('Username is already in use');
            }
        }),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(async (email) => {
            if (await UserFactory.isEmailUnique(email)) {
                throw new Error('Email is already in use');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];


export { loginValidators, registrationValidators, updateValidators };
