import express from "express";
import controller from "../controllers/UsersController";
import { isAuthorized } from "./../utils/auth";
import { auth } from "./middleware/auth.middleware";
import { loginValidators, registrationValidators, updateValidators } from "./validators/user.validator";
import { validate } from "./middleware/validator.middleware";

const router = express.Router();


/**
 * @swagger
 * /v1/users/create:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - email
 *               - username
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post(
    '/create',
    registrationValidators,
    validate,
    controller.createUser
);

/**
 * @swagger
 * /v1/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         username:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                           format: email
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                         updated_at:
 *                           type: string
 *                           format: date-time
 *                     token:
 *                       type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */



router.post('/login', loginValidators, validate, controller.loginUser);

/**
 * @swagger
 * /v1/users/update:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Updated user profile data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - confirm_password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       path:
 *                         type: string
 *                       location:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 */
router.put(
    '/update',
    auth(),
    updateValidators,
    validate,
    controller.updateUser
);


/**
 * @swagger
 * /v1/users/delete:
 *   delete:
 *     summary: Delete user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 */

router.delete('/delete', auth(), controller.deleteUser);


export = router;
