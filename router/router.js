const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const controller = require("../controller/controller");

const model = require("../model/model");

router.get('/', controller.home);

router.get('/view', controller.view);

router.post('/addrecord', model.upimage, [
    body("f_name").isLength(3),

    body("l_name").isLength(3),

    body("email")
    .trim().isEmail()
    .withMessage('Email must be a valid email')
    .normalizeEmail().toLowerCase(),

    body('password')
    .trim().isLength(2)
    .withMessage('password length is short, min 2 char reqired'),

    body('number')
    .trim().isLength(5)
    .withMessage('number length is 5 required'),

    body('co_password').custom((value, { req }) => {
        if (req.body.password == req.body.co_password) {
            throw new Error('Select co_password');
        }
        return true;
    }),

    body('Gender').custom((value, { req }) => {
        if (!req.body.Gender) {
            throw new Error('Select Gender');
        }
        return true;
    }),

    body('Hobby').custom((value, { req }) => {
        if (!req.body.Hobby) {
            throw new Error('Select Hobby');
        }
        return true;
    }),

], controller.addrecord);

router.get('/readmore/:id', controller.readmore);

router.get("/deleteRecord/:id", controller.deleteRecord);

module.exports = router;