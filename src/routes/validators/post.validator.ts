import { body, checkExact, param, query } from "express-validator";

export const createPostValidator = [
    body('title')
        .exists()
        .withMessage('title is required'),
    body('content')
        .exists()
        .withMessage('content is required'),
    checkExact([body("title").exists(), body("content").exists()])

];

export const updatePostValidator = [
    param("id")
        .exists()
        .withMessage("Post id is required"),
    body("title")
        .optional()
        .isString()
        .withMessage("title should be a string"),
    body("content")
        .optional()
        .isString()
        .withMessage("title should be a string"),
    checkExact([body("title").optional(), body("content").optional()])

]

export const deletePostValidator = [
    param("postId")
        .exists()
        .withMessage("Post id is required")
]

