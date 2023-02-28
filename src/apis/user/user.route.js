const express = require('express');
const userController = require('./user.controller');

const userRouter = express.Router();

userRouter.get('/user', userController.getUser);

module.exports = userRouter;